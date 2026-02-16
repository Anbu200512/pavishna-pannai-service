require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminAuthRoutes = require("./routes/adminAuthRoutes");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact-settings", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminAuthRoutes);

app.get("/", (req, res) => {
  res.send("Pavishna Pannai Service Backend is Running 🌱");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB error:", err));

