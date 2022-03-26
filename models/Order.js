const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  orders: {
    type: Array,
    ref: "Product",
  },

  totalPrice: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  deliverymode: {
    type: String,
  },
  store: {
    type: String,
  },
  phone: {
    type: String,
  },
  digitaladdress: {
    type: String,
  },
  country: {
    type: String,
  },
  paymentmode: {
    type: String,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
