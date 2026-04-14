const express = require("express");
const Station = require("../models/Station");

const router = express.Router();

const seedStations = async () => {
  const count = await Station.countDocuments();
  if (count > 0) return;

  await Station.insertMany([
    { name: "GreenVolt Hub", location: "Downtown", basePrice: 8.2, availability: 7, demandLevel: 70 },
    { name: "ChargePoint East", location: "City Mall", basePrice: 7.8, availability: 12, demandLevel: 45 },
    { name: "EcoCharge West", location: "Airport Road", basePrice: 8.5, availability: 4, demandLevel: 82 },
    { name: "VoltStation North", location: "Tech Park", basePrice: 7.5, availability: 15, demandLevel: 30 },
  ]);
};

router.get("/", async (req, res) => {
  try {
    await seedStations();
    const stations = await Station.find().sort({ createdAt: 1 });

    const response = stations.map((station) => {
      const priceModifier = 1 + station.demandLevel / 200 - station.availability / 100;
      const price = Number((station.basePrice * Math.max(priceModifier, 0.7)).toFixed(2));

      return {
        id: station._id,
        name: station.name,
        location: station.location,
        price,
        availability: station.availability,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch stations" });
  }
});

module.exports = router;
