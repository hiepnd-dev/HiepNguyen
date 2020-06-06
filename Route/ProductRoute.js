const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");
const util = require(`util`);


ProductRoute.post("/add", async (req, res) => {
  // Product.addProduct(req.body, (err, row) => {
  //   if (err)
  //     res.json({
  //       success: false,
  //       err,
  //     });
  //   else

            
  //     res.status(201).json({
  //       success: true,
  //       data: req.body,
  //     });
  // });
  const product = await Product.addProduct(req.body);
  res.status(201).json({
    success: true,
    data: product,
  });
});

ProductRoute.get("", async (req, res) => {
  const products = await Product.getAll;
  res.status(201).json({
    success: true,
    data: products,
  });
});

ProductRoute.get("/:id", async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

ProductRoute.post("/delete", (req, res) => {
  Product.deleteProduct(req.body.id, (err, row) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else
      res.status(201).json({
        success: true,
        data: row,
      });
  });
});

ProductRoute.post("/update", (req, res) => {
  Product.updateProduct(req.body, (err, row) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else
      res.status(201).json({
        success: true,
        data: row,
      });
  });
});

module.exports = ProductRoute;
