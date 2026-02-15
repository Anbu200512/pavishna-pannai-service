const express = require("express");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

/* SAVE CONTACT MESSAGE */
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const newMessage = await ContactMessage.create({
      name,
      phone,
      email,
      message
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Message save failed" });
  }
});

/* GET ALL MESSAGES (ADMIN) */
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* DELETE MESSAGE */
router.delete("/:id", async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
