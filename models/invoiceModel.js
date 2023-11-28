const mongoose = require("mongoose");
const User = require("./userModel");

const invoiceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "overdue"],
    required: [true, "Please provide the status"],
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide the due date"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "Please provide the receiver id"],
  },
  payerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "Please provide the payer id"],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
