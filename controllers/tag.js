const Tag = require("../models/Tags");

exports.addTagController = async (req, res) => {
  try {
    const { tag } = req.body;
    var t = new Tag({
      tag: tag,
    });
    var savedTag = await t.save();
    res.json(savedTag);
  } catch (error) {
    res.json(error);
  }
};

exports.editTagController = async (req, res) => {
  try {
    const { tag } = req.body;
    const tagId = req.params.id;

    const editedTag = await Tag.findByIdAndUpdate(tagId, {
      tag: tag,
    });

    res.json(editedTag);
  } catch (error) {
    res.json(error);
  }
};

exports.allTagController = async (req, res) => {
  try {
    let allTags = await Tag.find({});
    res.json(allTags);
  } catch (error) {
    res.json(error);
  }
};
