const express = require("express");

const router = express.Router();

const calculateDynamicPrice = () => {
  const hour = new Date().getHours();
  const demandFactor = Math.random();
  const availabilityFactor = Math.random();
  const basePrice = 8;

  let multiplier = 1;
  let message = "Normal demand";

  if ((hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 21)) {
    multiplier += 0.3;
  }

  if (demandFactor > 0.7) {
    multiplier += 0.4;
    message = "Peak demand";
  } else if (availabilityFactor > 0.7) {
    multiplier -= 0.2;
    message = "Low demand";
  }

  const price = Number((basePrice * multiplier).toFixed(2));
  return { price, message };
};

router.get("/", async (req, res) => {
  try {
    const pricingData = calculateDynamicPrice();
    return res.json(pricingData);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch pricing" });
  }
});

module.exports = router;
