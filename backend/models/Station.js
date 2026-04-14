const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    basePrice: { type: Number, required: true, default: 8 },
    availability: { type: Number, required: true, default: 10 },
    demandLevel: { type: Number, required: true, default: 50 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);
