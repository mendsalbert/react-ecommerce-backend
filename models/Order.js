const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  productIds: {
    type: Array,
    ref: "Product",
  },
  totalPrice: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
