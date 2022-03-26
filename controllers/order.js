const Order = require("../models/Order");

exports.addOrderController = async (req, res) => {
  try {
    //product ids must be transformed into array at the front end and send it back here
    const { orders, totalPrice } = req.body;
    const userId = req.user.id;
    // console.log(totalPrice);
    // console.log(orders[0].product);
    const date = Date.now();
    const order = new Order({
      date: date,
      orders: orders,
      totalPrice: totalPrice,
      paid: true,
      status: "pending",
      user: userId,
    });

    let savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.json(error);
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId: userId });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

exports.allOrderController = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};
