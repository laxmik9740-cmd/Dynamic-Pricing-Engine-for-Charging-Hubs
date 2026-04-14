const express = require("express");

const router = express.Router();

const getPseudoDistance = (start, destination) => {
  const combined = `${start}${destination}`;
  let hash = 0;

  for (let i = 0; i < combined.length; i += 1) {
    hash = (hash + combined.charCodeAt(i) * (i + 1)) % 500;
  }

  return Math.max(10, hash);
};

router.post("/", async (req, res) => {
  try {
    const { start, destination } = req.body;

    if (!start || !destination) {
      return res.status(400).json({ message: "Start and destination are required" });
    }

    const distance = getPseudoDistance(start, destination);
    const batteryUsage = Number((distance * 0.18).toFixed(2));

    return res.json({
      start,
      destination,
      distance,
      batteryUsage,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to plan trip" });
  }
});

module.exports = router;
