const mongoose = require("mongoose");
const Cart = require("../models/Cart");
exports.addCartController = async (req, res) => {
  try {
    let p_id = req.params.pid;
    let u_id = req.user.id;
    let cart = new Cart({
      productId: mongoose.Types.ObjectId(p_id),
      userId: mongoose.Types.ObjectId(u_id),
    });

    var savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    res.json(error);
  }
};

exports.removeCartController = async (req, res) => {
  try {
    const cart_id = req.params.id;
    const removedCart = await Cart.findByIdAndRemove(cart_id);
    res.json(removedCart);
  } catch (error) {
    res.json(error);
  }
};

exports.allCartController = async (req, res) => {
  try {
    let u_id = req.user.id;
    const allCart = await Cart.find({ userId: u_id }).populate(
      "products",
      "name"
    );
    res.json(allCart);
  } catch (error) {
    res.json(error);
  }
};
