const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

exports.addProductController = async (req, res, next) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      const { name, category, description, price, quantity } = fields;
      console.log(fields);
      const saveProduct = async () => {
        if (files.image.size > 2000000) {
          return res.json({ msg: "Please select file sizes less than 4MB" });
        }
        var image = fs.readFileSync(files.image.filepath);
        var encImage = new Buffer(image).toString("base64");

        const product = new Product({
          name,
          category,
          description,
          image: encImage,
          price,
          quantity,
        });

        let savedProduct = await product.save();
        res.json(savedProduct);
      };

      if (typeof files.image === "object") {
        saveProduct();
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.editProductController = async (req, res) => {
  try {
    let image = [];
    const id = req.params.id;
    const { name, category, tag } = req.body;
    let postedBy = req.user.id;
    let oldProduct = await Product.findById(id);
    if (req.files) {
      for (var i = 0; i < oldProduct.image.length; i++) {
        image.push(Math.random(0, 1) + req.files.image[i].name);
        await fs.unlink(
          "assets/productImages/" + oldProduct.image[i],
          (err) => {
            console.log("deleted old product and added a new one");
          }
        );

        if (req.files.image[i].size > 4000000) {
          res.json({ msg: "Please select file sizes less than 4MB" });
        }
        const pathToNewDestination = path.join(
          "assets/productImages",
          image[i]
        );
        await fs.copyFile(
          req.files.image[i].tempFilePath,
          pathToNewDestination,
          function (err) {
            if (err) {
              throw err;
            } else {
              console.log("Successfully copied and moved the file!");
            }
          }
        );
      }
    } else {
      for (var i = 0; i < oldProduct.image.length; i++) {
        image.push(oldProduct.image[i]);
      }
    }
    let product = await Product.findByIdAndUpdate(id, {
      name: name,
      category: category,
      tag: tag,
      postedBy: postedBy,
      image: image,
    });

    res.json(await Product.findById(id));
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    let oldProduct = await Product.findById(id);
    for (var i = 0; i < oldProduct.image.length; i++) {
      await fs.unlink("assets/productImages/" + oldProduct.image[i], (err) => {
        console.log("deleted old product and added a new one");
      });
      await Product.findByIdAndRemove(id);
    }
    res.json({ msg: "product deleted successfully" });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.allProductsController = async (req, res) => {
  try {
    let allProduct = await Product.find({});
    res.json(allProduct);
  } catch (error) {
    res.json(error);
  }
};
