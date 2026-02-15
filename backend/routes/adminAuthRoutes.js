const express = require("express");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const Service = require("../models/Service");
const Contact = require("../models/ContactMessage"); // adjust name if different

const router = express.Router();

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

router.get("/stats", async (req, res) => {
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

router.get("/latest-messages", async (req, res) => {
  try {
    const latestMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(latestMessages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});



module.exports = router;
