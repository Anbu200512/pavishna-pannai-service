const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String   // image filename
});

module.exports = mongoose.model("Product", productSchema);
