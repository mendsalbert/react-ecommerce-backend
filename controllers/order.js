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

    // let updateStatus = await Order.find(
    //   { _id: orderId }
    //   // {
    //   //   status: status,
    //   // }
    // );
    const updateStatus = await Order.findByIdAndUpdate(orderId, {
      status: status,
    });

    res.json(updateStatus);

    // console.log(updateStatus);
  } catch (error) {
    res.json(error);
  }
};
