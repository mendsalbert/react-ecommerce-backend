const mongoose = require("mongoose");
const Contact = require("../models/Contact");

exports.addContactController = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    let date = Date.now();
    let contact = new Contact({
      fullname,
      email,
      message,
      date: date,
    });

    var savedContact = await contact.save();
    res.json(savedContact);
  } catch (error) {
    res.json(error);
  }
};

exports.allContactController = async (req, res) => {
  try {
    const allCart = await Contact.find({});

    res.json(allCart);
  } catch (error) {
    res.json(error);
  }
};
