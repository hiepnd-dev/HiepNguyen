const express = require("express");
const CartItemRoute = express.Router();
const CartItem = require("../Model/CartItem");

CartItemRoute.post("/add", (req, res) => {
  CartItem.addCartItem(req.body, (err, row) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else
      res.status(201).json({
        success: true,
        data: req.body,
      });
  });
});

CartItemRoute.get("", (req, res) => {
  CartItem.getAll((err, rows) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else
      res.status(201).json({
        success: true,
        data: rows,
      });
  });
});

CartItemRoute.get("/:id",async (req, res) => {
 const data = await CartItem.getCartItemById(req.params.id);
  res.status(201).json({
    success: true,
    data: data,
  });
});

CartItemRoute.post("/delete", (req, res) => {
  CartItem.deleteCartItem(req.body.id, (err, row) => {
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

CartItemRoute.post("/update", (req, res) => {
  CartItem.updateCartItem(req.body, (err, row) => {
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

module.exports = CartItemRoute;
