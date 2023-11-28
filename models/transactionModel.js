const mongoose = require("mongoose");
const User = require("./userModel");
const Invoice = require("./invoiceModel");

const transactionSchema = new mongoose.Schema({
  invoiceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Invoice,
    required: [true, "Please provide the invoice id"],
  },
  payerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "Please provide the payer id"],
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "Please provide the receiver id"],
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    required: [true, "Please provide the status"],
  },
  paymentMethod: {
    type: String,
    required: [
      true,
      "Please provide the payment method offline(cash) or online(credit card, bank transfer etc)",
    ],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
