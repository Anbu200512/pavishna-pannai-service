const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// GET products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST product with image
router.post("/", upload.single("image"), async (req, res) => {
  const { name, category } = req.body;

  const product = new Product({
    name,
    category,
    image: req.file.filename
  });

  await product.save();
  res.json(product);
});

module.exports = router;
