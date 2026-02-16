const express = require("express");
const Service = require("../models/Service");
const upload = require("../middleware/upload"); // ✅ Cloudinary upload

const router = express.Router();

/* ================= ADD SERVICE ================= */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const service = await Service.create({
      title,
      description,
      image: req.file.path, // ✅ Cloudinary URL
    });

    res.status(201).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL SERVICES ================= */
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE SERVICE ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = { title, description };

    if (req.file) {
      updateData.image = req.file.path; // ✅ Cloudinary URL
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* ================= DELETE SERVICE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
