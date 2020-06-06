const express = require("express");
const bcrypt = require("bcrypt"); // thu vien tao ma hoa
const jwt = require("jsonwebtoken"); // thu vien tao ma hoa 
const AuthRouter = express.Router();

const jwtSecret = "sadu&^123i897au&Y*&";// chu ky ma hoa mat khau 

const accountModel = require("../Model/Account");

AuthRouter.post("", (req, res) => {
  // TODO:
  // - Get username, password from request
  // - Check if user with username exist
  // - Compare password
  // -

  // const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({ success: false, 
      message: "Thiếu username hoặc password!" });
  } else
    accountModel.getAccountByName(username, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        if (rows.length == 0) {
          res.json({
            success: false,
            message: "Không tồn tại người dùng có username này!",
          });
        } else {
          if (bcrypt.compareSync(password, rows[0].password)) {
            const access_token = jwt.sign(
              { username, id: rows[0].id },
              jwtSecret
            );
            res.json({
              success: true,
              message: "Đăng nhập thành công!",
              access_token,
              user: {
                username,
                id: rows.id,
              },
            });
          } else {
            res.json({ success: false, message: "Sai mật khẩu!" });
          }
        }
      }
    });
});

AuthRouter.post("/check", (req, res) => {
  const access_token = req.body.access_token;
  jwt.verify(access_token, jwtSecret, (err, user) => {
    if (err) {
      res.send({
        success: false,
        message: "Người dùng chưa đăng nhập",
      });
    } else
      res.send({
        success: true,
        message: "Người dùng đã đăng nhập",
        user: user,
      });
  });
});

module.exports = AuthRouter;
