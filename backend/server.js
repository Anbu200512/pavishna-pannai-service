require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const adminAuthRoutes = require("./routes/adminAuthRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

// Security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pavishna-pannai-service.vercel.app",
    ],
    credentials: true,
  })
);

// JSON parsing
app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact-settings", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminAuthRoutes);

app.get("/", (req, res) => {
  res.send("Pavishna Pannai Service Backend is Running 🌱");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ================= DATABASE CONNECTION ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));
