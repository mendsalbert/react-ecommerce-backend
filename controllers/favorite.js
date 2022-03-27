const Favorite = require("../models/Favorite");
const mongoose = require("mongoose");

exports.addFavoriteController = async (req, res) => {
  try {
    let p_id = req.params.pid;
    let u_id = req.user.id;

    // console.log(p_id);
    isFavoriteExist = await Favorite.find({ product: p_id, user: u_id });
    if (isFavoriteExist.length > 0) {
      return res.status(500).json("Favorite has been addedd already");
    }
    let favorite = new Favorite({
      product: mongoose.Types.ObjectId(p_id),
      user: mongoose.Types.ObjectId(u_id),
    });

    var savefavorite = await favorite.save();
    res.json(savefavorite);
  } catch (error) {
    res.json(error);
  }
};

exports.removeFavoriteController = async (req, res) => {
  try {
    const favorite_id = req.params.id;
    let userid = req.user.id;

    const removedFavorite = await Favorite.deleteOne({
      user: userid,
      _id: favorite_id,
    });
    res.json(removedFavorite);
  } catch (error) {
    res.json(error);
  }
};

exports.getUserFavourite = async (req, res) => {
  try {
    let userId = req.user.id;
    const allFavorite = await Favorite.find({ userId: userId });
    res.json(allFavorite);
  } catch (error) {
    res.json(error);
  }
};

exports.allFavoriteController = async (req, res) => {
  try {
    let u_id = req.user.id;
    // console.log(u_id);
    const allFavorite = await Favorite.find({ user: u_id })
      .populate("product")
      .populate("user")
      .exec();
    res.json(allFavorite);
  } catch (error) {
    res.json(error);
  }
};
