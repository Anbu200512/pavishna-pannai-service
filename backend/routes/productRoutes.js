const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload"); // ✅ Cloudinary upload
const cloudinary = require("cloudinary").v2;

const router = express.Router();

/* ================= ADD PRODUCT ================= */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, specification, description, category, brand } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name,
      specification,
      description,
      category,
      brand,
      image: req.file.path, // ✅ Cloudinary URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET SINGLE PRODUCT ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE PRODUCT ================= */
/* ================= UPDATE PRODUCT ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, specification, description, category, brand } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = {
      name,
      specification,
      description,
      category,
      brand,
    };

    if (req.file) {
      // Delete old image
      const oldPublicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(oldPublicId);

      // Save new image
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract public_id from Cloudinary URL
    const imageUrl = product.image;
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete product from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = router;
