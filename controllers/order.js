const Order = require("../models/Order");

exports.addOrderController = async (req, res) => {
  try {
    //product ids must be transformed into array at the front end and send it back here
    const productIds = [1, 2, 3];
    const userId = req.user.id;
    //total must also come from the front end
    const totalPrice = 20.0;
    const paid = false;
    const date = new Date();
    const order = new Order({
      date: date,
      productIds: productIds,
      totalPrice: totalPrice,
      paid: paid,
      userId: userId,
    });

    let savedOrder = await order.save();
    res.json(savedOrder);
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
