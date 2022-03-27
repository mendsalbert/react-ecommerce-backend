const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Contaact", ContactSchema);
