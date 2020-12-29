const Cart = require("../models/Cart");
exports.addCartController = async (req, res) => {
  try {
    let p_id = req.params.pid;
    let u_id = req.user.id;
    let cart = new Cart({
      productId: p_id,
      userId: u_id,
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
    const allCart = await Cart.find({});
    res.json(allCart);
  } catch (error) {
    res.json(error);
  }
};
