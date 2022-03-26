const mongoose = require("mongoose");
const Cart = require("../models/Cart");

exports.addCartController = async (req, res) => {
  try {
    let p_id = req.params.pid;
    let u_id = req.user.id;

    isCartExist = await Cart.find({ product: p_id, user: u_id });
    // console.log(isCartExist);
    if (isCartExist.length > 0) {
      return res.status(500).json("Cart has been addedd already");
    }
    let cart = new Cart({
      product: mongoose.Types.ObjectId(p_id),
      user: mongoose.Types.ObjectId(u_id),
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
    let userid = req.user.id;
    // console.log(cart_id);
    const removedCart = await Cart.deleteOne({ user: userid, _id: cart_id });
    res.json(removedCart);
  } catch (error) {
    res.json(error);
  }
};

exports.allCartController = async (req, res) => {
  try {
    let u_id = req.user.id;
    const allCart = await Cart.find({ user: u_id })
      .populate("product")
      .populate("user")
      .exec();
    res.json(allCart);
  } catch (error) {
    res.json(error);
  }
};
