const express = require("express");
const router = express.Router();
const {
  addOrderController,
  allOrderController,
  getUserOrders,
  updateStatus,
} = require("../controllers/order");
const { authenticated } = require("../middlewares/authenticate");
//!!delete order will be added later
//@route -- POST api/order/add-order
//@desc -- adding an order
//@access -- public

router.post("/add-order", authenticated, addOrderController);

//@route -- POST api/order/all-orders
//@desc -- view all orders
//@access -- public
router.get("/all-orders", allOrderController);

router.get("/user-orders", authenticated, getUserOrders);

router.post("/update-status/:status/:id", updateStatus);
module.exports = router;
