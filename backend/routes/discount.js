const express = require("express");
const router = express.Router();
const Discount = require("../models/Discount");
const Wallet = require("../models/Wallet");

// Apply discount
router.post("/apply", async (req, res) => {
  const { doctorId, patientId, amount } = req.body;

  try {
    // Check if discount is already used
    const discount = await Discount.findOne({ doctorId, patientId });
    if (discount && discount.used) {
      return res
        .status(400)
        .json({ message: "Discount already used for this doctor." });
    }

    // Deduct discount from wallet
    const wallet = await Wallet.findOne({ patientId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance." });
    }

    wallet.balance -= amount;
    wallet.transactions.push({
      amount,
      type: "debit",
      description: "Consultation Discount",
    });
    await wallet.save();

    // Mark discount as used
    if (!discount) {
      await Discount.create({ doctorId, patientId, used: true });
    } else {
      discount.used = true;
      await discount.save();
    }

    res.json({ message: "Discount applied successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
