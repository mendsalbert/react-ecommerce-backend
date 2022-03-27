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
      const { name, category, description, price, status, quantity } = fields;
      // console.log(files.image.path);
      const saveProduct = async () => {
        if (files.image.size > 2000000) {
          return res.json({ msg: "Please select file sizes less than 4MB" });
        }
        var image = fs.readFileSync(files.image.path);
        var encImage = new Buffer(image).toString("base64");
        // console.log(encImage);
        const product = new Product({
          name,
          category,
          description,
          image: encImage,
          price,
          status,
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
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      const id = req.params.id;
      const { name, category, description, price, status, quantity } = fields;
      // console.log(files.image.path);
      const saveProduct = async () => {
        var encImage = "";
        if (typeof files.image === "object") {
          if (files.image.size > 2000000) {
            return res.json({ msg: "Please select file sizes less than 4MB" });
          }
          var image = fs.readFileSync(files.image.path);
          encImage = new Buffer(image).toString("base64");

          // console.log(encImage);
        } else {
          let product = await Product.findByIdAndUpdate(id, {
            name,
            category,
            description,
            image: encImage,
            price,
            status,
            quantity,
          });

          let savedProduct = await product.save();
          // res.json(savedProduct);
        }
      };

      saveProduct();
      // if (typeof files.image === "object") {
      // }
    });

    res.json("success");
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

exports.getProductController = async (req, res) => {
  try {
    // console.log("working");
    let id = req.params.id;
    let product = await Product.find({ _id: id });
    res.json(product);
    // console.log("product", product);
  } catch (error) {
    res.json(error);
  }
};

exports.searchProductController = async (req, res) => {
  try {
    let searchQuery = req.params.search;
    let allProduct = await Product.find({ $text: { $search: searchQuery } });
    res.json(allProduct);
  } catch (error) {
    res.json(error);
  }
};
