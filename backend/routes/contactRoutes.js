const express = require("express");
const ContactSettings = require("../models/ContactSettings");

const router = express.Router();

/* GET CONTACT SETTINGS */
router.get("/", async (req, res) => {
  try {
    const settings = await ContactSettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* CREATE OR UPDATE CONTACT SETTINGS */
router.post("/", async (req, res) => {
  try {
    const { phone, email, address, workingHours, whatsapp, mapEmbedLink } = req.body;

    let settings = await ContactSettings.findOne();

    if (settings) {
      settings.phone = phone;
      settings.email = email;
      settings.address = address;
      settings.workingHours = workingHours;
      settings.whatsapp = whatsapp;
      settings.mapEmbedLink = mapEmbedLink;

      await settings.save();
    } else {
      settings = await ContactSettings.create({
        phone,
        email,
        address,
        workingHours,
        whatsapp,
        mapEmbedLink
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
