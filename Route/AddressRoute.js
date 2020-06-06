const express = require("express");
const AddressRoute = express.Router();
const Address = require("../Model/Address");

AddressRoute.post("/add", (req, res) => {
  Address.addAddress(req.body, (err, row) => {
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

AddressRoute.get("", (req, res) => {
  Address.getAll((err, rows) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else {
      res.status(201).json({
        success: true,
        data: rows,
      });
    }
  });
});

// AddressRoute.get("", (req, res) => {
//  const row = Address.getAll();
//  console.log(row);
//  res.status(201).json({
//    row
//  })
// });

AddressRoute.get("/:id", async (req, res) => {
  const address = await Address.getAddressById(req.params.id);
  res.status(201).json({
    success: true,
    data: address,
  });
});

AddressRoute.post("/delete", (req, res) => {
  Address.deleteAddress(req.body.id, (err, row) => {
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

AddressRoute.post("/update", (req, res) => {
  Address.updateAddress(req.body, (err, row) => {
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

module.exports = AddressRoute;
