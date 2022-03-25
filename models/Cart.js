const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", CartSchema);
