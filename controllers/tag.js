const Tag = require("../models/Tags");

exports.addTagController = async (req, res, next) => {
  try {
    const { tag } = req.body;
    var transTag = tag.toLowerCase();
    var tagExist = await Tag.find({ tag: transTag });
    if (tagExist.length > 0) {
      return res.status(400).json({ msg: "Tag already exist" });
    } else {
      var t = new Tag({
        tag: tag,
      });
      var savedTag = await t.save();
      res.json(savedTag);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.isTagExist = async (req, res) => {
  try {
    const { tag } = req.body;
    var tagToLowerCase = tag.toLowerCase();
    var tagExist = await Tag.find({ tag: tagToLowerCase });
    if (tagExist.length > 0) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.editTagController = async (req, res) => {
  try {
    const { tag } = req.body;
    const tagId = req.params.id;
    var transTag = tag.toLowerCase();
    var tagExist = await Tag.find({ tag: transTag });
    if (tagExist.length > 0) {
      return res.status(400).json({ msg: "Tag already exist" });
    } else {
      const editedTag = await Tag.findByIdAndUpdate(tagId, {
        tag: tag,
      });
      res.json(editedTag);
    }
  } catch (error) {
    res.status(500).send("Server Error");
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

exports.deleteTagController = async (req, res) => {
  try {
    const { tag } = req.body;
    const tagId = req.params.id;
    const deleteTag = await Tag.findByIdAndRemove(tagId, {
      tag: tag,
    });

    res.json(deleteTag);
  } catch (error) {
    res.json(error);
  }
};
