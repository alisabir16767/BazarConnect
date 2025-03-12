const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transaction_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  transaction_status: {
    type: String,
    enum: ["success", "pending", "failure"],
    default: "pending",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

transactionSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
