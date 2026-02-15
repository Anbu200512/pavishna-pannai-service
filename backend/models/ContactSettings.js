const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    workingHours: { type: String },
    whatsapp: { type: String },
    mapEmbedLink: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
