const express = require("express");
const ShippingInfoRoute = express.Router();
const ShippingInfo = require("../Model/ShippingInfo");

ShippingInfoRoute.post("/add", (req, res) => {
  ShippingInfo.addShippingInfo(req.body, (err, row) => {
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

ShippingInfoRoute.get("", (req, res) => {
  ShippingInfo.getAll((err, rows) => {
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

ShippingInfoRoute.get("/:id", async (req, res) => {
  const shipping = await ShippingInfo.getShippingInfoById(req.params.id);
  return shipping;
});

ShippingInfoRoute.post("/delete", (req, res) => {
  ShippingInfo.deleteShippingInfo(req.body.id, (err, row) => {
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

ShippingInfoRoute.post("/update", (req, res) => {
  ShippingInfo.updateShippingInfo(req.id, req.body, (err, row) => {
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

module.exports = ShippingInfoRoute;
