const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: { type: Buffer, type: String },

  rating: {
    type: String,
  },
  status: {
    type: String,
  },
  price: {
    type: String,
  },
  tempQuantity: {
    type: Number,
  },
  isApproved: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  tempQuantity: {
    type: Number,
    default: 1,
  },
});
ProductSchema.index({ name: "text", description: "text", category: "text" });
module.exports = mongoose.model("Product", ProductSchema);
