const express = require("express");
const ImageRoute = express.Router();
const Image = require("../Model/Image");

ImageRoute.post("/add", (req, res) => {
  Image.addImage(req.body, (err, row) => {
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

ImageRoute.get("", (req, res) => {
  Image.getAll((err, rows) => {
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

ImageRoute.get("/:id", (req, res) => {
  Image.getImageById(req.params.id, (err, row) => {
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

ImageRoute.post("/delete", (req, res) => {
  Image.deleteImage(req.body.id, (err, row) => {
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

ImageRoute.post("/update", (req, res) => {
  Image.updateImage(req.body, (err, row) => {
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

module.exports = ImageRoute;
