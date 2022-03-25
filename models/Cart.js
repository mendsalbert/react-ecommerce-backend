const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = mongoose.Schema({
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Cart", CartSchema);
