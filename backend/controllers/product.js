const Product = require("../Models/product");
const jwtKey = "e-commerce";
const Jwt = require("jsonwebtoken");

// Add Product API

const addProduct = async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  result = result.toObject();
  if (result) {
    Jwt.sign({ result }, jwtKey, { expiresIn: "2d" }, (err, token) => {
      if (err) {
        res.send({ result: "Something went wrong please try again" });
      }
      res.send({ result, auth: token });
    });
  } else {
    res.send({ result: "Something went wrong" });
  }
  //  resp.send(result);
};

// Product Listing API

const getProducts = async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("No product found");
  }
};

// Delete Product API

const deleteProduct = async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
};

// API to get single product data

const getOneProduct = async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
};

// API to update Data

const updateProduct = async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
};

// Search API

const searchProduct = async (req, res) => {
  let result = await Product.find({
    $or: [{ category: { $regex: req.params.key } }],
  });
  res.send(result);
};

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
};
