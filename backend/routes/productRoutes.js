const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} = require("../controllers/product");

router.post("/add", addProduct);

router.get("/getProducts", getProducts);

router.get("/:id", getOneProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

router.get("/:key", searchProduct);

module.exports = router;
