const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      resolve("database connected");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = connectDB;
