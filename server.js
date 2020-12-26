const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//init middleware
app.use(express.json({ extended: false }));

//router middleware
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
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
