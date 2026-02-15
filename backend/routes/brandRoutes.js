const express = require("express");
const Brand = require("../models/Brand");

const router = express.Router();

/* ADD BRAND */
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Brand.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Brand exists" });
    }

    const brand = await Brand.create({ name });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET BRANDS */
router.get("/", async (req, res) => {
  const brands = await Brand.find().sort({ name: 1 });
  res.json(brands);
});

/* DELETE BRAND */
router.delete("/:id", async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
