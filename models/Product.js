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
  tag: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: Array,
    required: true,
  },
  rating: {
    type: String,
  },
  price: {
    type: String,
  },
  isApproved: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
