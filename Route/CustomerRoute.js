const express = require("express");
const CustomerRoute = express.Router();
const Customer = require("../Model/Customer");

CustomerRoute.post("/add", (req, res) => {
  Customer.addCustomer(req.body, (err, row) => {
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

CustomerRoute.get("", async (req, res) => {
  const customers = await Customer.getAll();
  res.status(201).json({
    success: true,
    data: customers,
  });
});

// CustomerRoute.get("", (req, res) => {
//  const row = Customer.getAll();
//  console.log(row);
//  res.status(201).json({
//    row
//  })
// });

CustomerRoute.get("/:id", async (req, res) => {
  const customer = await Customer.getCustomerById(req.params.id);
  res.status(201).json({
    success: true,
    data: customer,
  });
});

CustomerRoute.post("/delete", (req, res) => {
  Customer.deleteCustomer(req.body.id, (err, row) => {
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

CustomerRoute.post("/update", (req, res) => {
  Customer.updateCustomer(req.body, (err, row) => {
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

module.exports = CustomerRoute;
