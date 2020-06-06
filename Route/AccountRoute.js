const express = require("express");
const AccountRoute = express.Router();
const Account = require("../Model/Account");
const bcrypt = require("bcrypt");

AccountRoute.post("/add", (req, res) => {
  const { username, password,fullName,role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 12);
  const acc = {
    username: username,
    password: hashPassword,
    fullName: fullName,
    role: role
  };
  Account.addAccount(acc, (err, row) => {
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

AccountRoute.get("", (req, res) => {
  Account.getAll((err, rows) => {
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

AccountRoute.get("/:id", (req, res) => {
  Account.getAccountById(req.params.id, (err, row) => {
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

AccountRoute.post("/delete", (req, res) => {
  Account.deleteAccount(req.body.id, (err, row) => {
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

AccountRoute.post("/update", (req, res) => {
  const { id, password, fullName, role } = req.body;

  const hashPassword = bcrypt.hashSync(password, 12);
  const acc = {
    id: id,
    password: hashPassword,
    fullName: fullName,
    role: role,
  };
  Account.updateAccount(acc, (err, row) => {
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

module.exports = AccountRoute;
