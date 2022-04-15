const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//controller to authenticate a user / login a user
exports.userLogInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user with this email doesnt exist");
      error.statusCode = 500;
      return error;
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const error = new Error("password or email is incorrect");
        res.json({ msg: "Password or email is incorrect" });
        throw error;
      }
    }
    //payload for jwt (user_id)
    const payLoad = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payLoad,
      config.get("jwtSecret"),
      // { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
    return;
  } catch (error) {
    res.status(500).json({ msg: error });
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return error;
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    let user = await await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.userRestPasswordController = async (req, res) => {
  try {
    const token = req.params.reset_token.toString();
    const { password } = req.body;

    let salt = await bcrypt.genSalt(12);
    let hashPassword = await bcrypt.hash(password, salt);
    let updateUserPassword = await User.findOneAndUpdate(
      { token },
      { password: hashPassword }
    );

    if (!updateUserPassword) {
      return res.json({ msg: "invalid token to update your password" });
    }

    let user = await User.findOne({ token });

    //payload for jwt (user_id)
    const payLoad = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payLoad,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
    // res.json({ msg: "password updated successfully" });
    //redirect user to login  if password update was successful
  } catch (error) {
    res.json(error);
  }
};
