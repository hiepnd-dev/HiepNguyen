const express = require("express");
const ItemRoute = express.Router();
const Item = require("../Model/Item");

ItemRoute.post("/add", (req, res) => {
  Item.addItem(req.body, (err, row) => {
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

ItemRoute.get("", async (req, res) => {
  const data = await Item.getAll();
  res.status(201).json({
    success: true,
    data: data,
  });
});

ItemRoute.get("/:id", async (req, res) => {
  const data = await Item.getItemById(req.params.id);
  res.status(201).json({
    success: true,
    data: data,
  });
});

ItemRoute.post("/delete", (req, res) => {
  Item.deleteItem(req.body.id, (err, row) => {
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

ItemRoute.post("/update", (req, res) => {
  Item.updateItem(req.body, (err, row) => {
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

module.exports = ItemRoute;
