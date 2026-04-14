const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const usage = [28, 35, 31, 42, 39, 45, 38];
    const cost = [52, 63, 58, 77, 69, 82, 71];

    const totalSessions = usage.reduce((sum, value) => sum + value, 0);
    const totalCost = cost.reduce((sum, value) => sum + value, 0);

    return res.json({
      user: req.user.name,
      usage,
      cost,
      totalSessions,
      totalCost: Number(totalCost.toFixed(2)),
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch user stats" });
  }
});

module.exports = router;
