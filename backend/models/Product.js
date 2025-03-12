const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
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

productSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
