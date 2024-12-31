const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// Get wallet info
router.get("/:patientId", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ patientId: req.params.patientId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found." });
    }
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
