const Favorite = require("../models/Favorite");
exports.addFavoriteController = async (req, res) => {
  try {
    let p_id = req.params.pid;
    let u_id = req.user.id;
    let favorite = new Favorite({
      productId: p_id,
      userId: u_id,
    });

    var savedFavorite = await favorite.save();
    res.json(savedFavorite);
  } catch (error) {
    res.json(error);
  }
};

exports.removeFavoriteController = async (req, res) => {
  try {
    const favorite_id = req.params.id;
    const removedFavorite = await Favorite.findByIdAndRemove(favorite_id);
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
    const allFavorite = await Favorite.find({});
    res.json(allFavorite);
  } catch (error) {
    res.json(error);
  }
};
