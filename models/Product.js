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
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: { type: Buffer, type: String },
  rating: {
    type: String,
  },
  price: {
    type: String,
  },
  isApproved: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
