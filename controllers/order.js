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
    // console.log(req.user.id);
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

exports.allOrderController = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

exports.pendingOrderController = async (req, res) => {
  try {
    const orders = await Order.find({ status: "processing" }).sort({
      date: -1,
    });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};
exports.updateStatus = async (req, res) => {
  try {
    let status = req.params.status;
    let orderId = req.params.id;

    const updateStatus = await Order.findByIdAndUpdate(orderId, {
      status: status,
    });
    res.json(updateStatus);
  } catch (error) {
    res.json(error);
  }
};

exports.updateFeedbackController = async (req, res) => {
  try {
    let orderId = req.params.id;
    const { feedbackStatus, feedbackComment } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {
      feedbackStatus,
      feedbackComment,
    });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

exports.updateRefundController = async (req, res) => {
  try {
    let orderId = req.params.id;
    const { refundStatus, refundComment } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {
      refundStatus,
      refundComment,
    });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};
