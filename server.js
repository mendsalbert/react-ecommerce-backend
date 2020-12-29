const express = require("express");
const app = express();
const path = require("path");
const expressUpload = require("express-fileupload");
const connectDB = require("./config/db");
//@cart related routes
const cartRoute = require("./routes/cart");

//@category related routes
const categoryRoute = require("./routes/category");

//@Favorite related routes
const favoriteRoute = require("./routes/favorite");

//@Orders related routes
const orderRoute = require("./routes/order");

//@Tag related routes
const tagRoute = require("./routes/tag");

//@user related routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//@product related routes
const productRoute = require("./routes/product");

//init middleware
app.use(express.json());
app.use(expressUpload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "asset")));

//@user router middleware
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

//@product router middleware
app.use("/api/product", productRoute);

//@cart router middleware
app.use("/api/cart", cartRoute);

//@category router middleware
app.use("/api/category", categoryRoute);

//@favorite router middleware
app.use("/api/favorite", favoriteRoute);

//@order router middleware
app.use("/api/order", orderRoute);

//@tag router middleware
app.use("/api/tag", tagRoute);

// @home page
app.use("/", (req, res) => {
  res.json({ msg: "home page" });
});

//init database
connectDB()
  .then((success) => {
    console.log(success);
    app.listen("1000");
  })
  .catch((e) => {
    console.log(e);
  });
