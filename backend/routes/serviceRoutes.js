const express = require("express");
const Service = require("../models/Service");
const upload = require("../middleware/upload"); // ✅ Cloudinary upload
const cloudinary = require("cloudinary").v2;

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

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const updateData = { title, description };

    if (req.file) {
      // Delete old image from Cloudinary
      const oldPublicId = service.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(oldPublicId);

      // Save new image
      updateData.image = req.file.path;
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});


/* ================= DELETE SERVICE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Extract public_id from Cloudinary URL
    const imageUrl = service.image;
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await Service.findByIdAndDelete(req.params.id);

    res.json({ message: "Service and image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = router;
