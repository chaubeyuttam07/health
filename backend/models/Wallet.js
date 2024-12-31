const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  balance: { type: Number, default: 100 }, // Default wallet balance
  transactions: [
    {
      amount: Number,
      type: String, // 'debit' or 'credit'
      description: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Wallet", WalletSchema);
