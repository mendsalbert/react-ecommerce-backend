const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  order: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  favorite: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],
});

module.exports = mongoose.model("User", UserSchema);
