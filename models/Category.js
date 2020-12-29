const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: Array,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
