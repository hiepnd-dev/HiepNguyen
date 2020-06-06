const express = require("express");
const Route = express.Router();
const ProductRoute = require("./ProductRoute");
const CategoryRoute = require("./CategoryRoute");
const AccountRoute = require("./AccountRoute");
const AddressRoute = require("./AddressRoute");
const CustomerRoute = require("./CustomerRoute");
const ImageRoute = require("./ImageRoute");
const CartItemRoute = require("./CartItemRoute");
const OrderDetailRoute = require("./OrderDetailRoute");
const ItemRoute = require("./ItemRoute");
const ShippingInfoRoute = require("./ShippingInfoRoute");
const AuthRoute = require("./AuthRoute");
const VNPay = require("./VNPay");
const PageRoute = require("./PageRoute");
// const userRoute = require("./UserRoute");


Route.use("/product", ProductRoute);
Route.use("/category", CategoryRoute);
Route.use("/account", AccountRoute);
Route.use("/customer", CustomerRoute);
Route.use("/image", ImageRoute);
Route.use("/order", OrderDetailRoute);
Route.use("/cartItem", CartItemRoute);
Route.use("/item", ItemRoute);
Route.use("/address", AddressRoute);
Route.use("/shipping", ShippingInfoRoute);
Route.use("/login", AuthRoute);
Route.use("/vnpay", VNPay);
Route.use("/page", PageRoute);
// Route.use("/user", userRoute);

module.exports = Route;
