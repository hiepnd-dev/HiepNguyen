const express = require("express");
const CategoryRoute = express.Router();
const Category = require("../Model/Category");

CategoryRoute.post("/add", (req, res) => {
  Category.addCategory(req.body, (err, row) => {
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

CategoryRoute.get("", (req, res) => {
  Category.getAll((err, rows) => {
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

CategoryRoute.get("/:id", async (req, res) => {
  const category = await Category.getCategoryById(req.params.id);
  res.json({
    data: category,
  });
  // Category.getCategoryById(req.params.id, (err, row) => {
  //   if (err) res.json({
  //              success: false,
  //              err,
  //            });
  //   else
  //     res.status(201).json({
  //       success: true,
  //       data: row[0],
  //     });
  // });
});

CategoryRoute.post("/delete", (req, res) => {
  Category.deleteCategory(req.body.id, (err, row) => {
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

CategoryRoute.post("/update", (req, res) => {
  Category.updateCategory(req.body, (err, row) => {
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

module.exports = CategoryRoute;
