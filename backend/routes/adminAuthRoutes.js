const express = require("express");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const Service = require("../models/Service");
const Contact = require("../models/ContactMessage");

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

/* ================= LOGIN ================= */

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

/* ================= ADMIN STATS (PROTECTED) ================= */

router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const serviceCount = await Service.countDocuments();
    const messageCount = await Contact.countDocuments();

    res.json({
      products: productCount,
      services: serviceCount,
      messages: messageCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

/* ================= LATEST MESSAGES (PROTECTED) ================= */

router.get("/latest-messages", verifyAdmin, async (req, res) => {
  try {
    const latestMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json(latestMessages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
