const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// READ all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// CREATE product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, category } = req.body;
  const product = new Product({
    name,
    category,
    image: req.file.filename,
  });
  await product.save();
  res.json(product);
});

// UPDATE product
router.put("/:id", upload.single("image"), async (req, res) => {
  const { name, category } = req.body;

  const updateData = { name, category };
  if (req.file) updateData.image = req.file.filename;

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
