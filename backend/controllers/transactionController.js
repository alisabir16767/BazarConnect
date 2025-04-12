const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Order = require("../models/Order");
const { ExpressError, asyncWrap } = require("../middleware/errorMiddleware");

// CREATE NEW TRANSACTION
exports.createTransaction = asyncWrap(async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.status(201).json({ message: "Transaction created successfully" });
});

// GET  ALL TRANSACTIONS
exports.getAllTransaction = asyncWrap(async (req, res) => {
  const transactions = await Transaction.find();
  if (transactions.length === 0)
    return next(new ExpressError(404, "Transaction Not Found"));
  res.status(200).json(transactions);
});

// GET TRANSACTION BY USER ID
exports.getById = asyncWrap(async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return next(new ExpressError(404, "Transaction Not Found"));
  }
  res.status(200).json(transaction);
});

// UPDATE EXISTING TRANSACTION
exports.updateTransaction = asyncWrap(async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return next(new ExpressError(404, "Transaction Not Found"));
  }
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== "_id") {
      transaction[key] = req.body[key];
    }
  }
  await transaction.save();
  res.status(200).json({ message: "Updated successfully" });
});

// DELETE TRANSACTION
exports.deleteTransaction = asyncWrap(async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return next(new ExpressError(404, "Transaction Not Found"));
  }
  await transaction.deleteOne();
  res.status(200).json({ message: "deleted succesfully" });
});
