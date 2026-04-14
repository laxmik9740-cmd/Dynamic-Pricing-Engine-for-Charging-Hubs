const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const stationRoutes = require("./routes/stationRoutes");
const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/evproject";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Dynamic Pricing Engine API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal server error",
  });
});

const connectAndStart = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1);
  }
};

connectAndStart();
