const Order = require("../models/Order");

exports.addOrderController = async (req, res) => {
  try {
    //product ids must be transformed into array at the front end and send it back here
    const {
      orders,
      totalPrice,
      deliverymode,
      store,
      phone,
      digitaladdress,
      country,
    } = req.body;
    const userId = req.user.id;

    const date = Date.now();
    const order = new Order({
      date: date,
      orders: orders,
      totalPrice: totalPrice,
      paid: true,
      status: "pending",
      deliverymode: deliverymode,
      store: store,
      phone,
      digitaladdress,
      country,
      user: userId,
      paymentmode: "momo",
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
