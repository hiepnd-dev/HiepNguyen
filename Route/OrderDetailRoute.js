const express = require("express");
const OrderDetailRoute = express.Router();
const OrderDetail = require("../Model/OrderDetail");

OrderDetailRoute.post("/add", (req, res) => {
  OrderDetail.addOrderDetail(req.body, (err, row) => {
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

OrderDetailRoute.get("", async (req, res) => {
  const order = await OrderDetail.getAll();
   res.status(201).json({
     success: true,
     data: order,
   });

});

OrderDetailRoute.get("/:id", async(req, res) => {
  const order = await OrderDetail.getOrderDetailById(req.params.id);
   res.status(201).json({
     success: true,
     data: order,
   });
});

OrderDetailRoute.post("/delete", (req, res) => {
  OrderDetail.deleteOrderDetail(req.body.id, (err, row) => {
    if (err)
      res.json({
        success: false,
        err,
      });
    else
      res.status(201).json({
        success: true,
        data: row[0],
      });
  });
});

OrderDetailRoute.post("/update", (req, res) => {
  OrderDetail.updateOrderDetail(req.body, (err, row) => {
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

module.exports = OrderDetailRoute;
