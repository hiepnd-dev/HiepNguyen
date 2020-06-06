const connection = require("../connection");

const Payment = require("./Payment");
const Account = require("./Account");
const Customer = require("./Customer");
const CartItem = require("./CartItem");
const Address = require("./Address");
const ShippingInfo = require("./ShippingInfo");

const getAll = async () => {
  let orders = await connection.promiseQuery(
    `Select * from OrderDetail where status="ACTIVE"`
  );
  const orderPromise = orders.map(async (order) => {
    const cartItem = await CartItem.getCartItemByOrderId(order.id);
    const payment = await Payment.getPaymentById(order.paymentId);
    const shipping = await ShippingInfo.getShippingInfoById(order.shippingId);
    const address = await Address.getAddressById(order.addressId);
    const customer = await Customer.getCustomerById(address.customerId);
    const account = await Account.getAccountById(order.accountId);
    console.log(shipping)
    return {
      ...order,
      cartItem,
      payment,
      customer,
      address,
      account,
      shipping,
    };
  });
  orders = Promise.all(orderPromise);
  return orders;
};

const getOrderDetailById = async (id) => {
  let order = await connection.promiseQuery(
    'Select * from OrderDetail where id = ? and status = "ACTIVE" ',
    [id]
  );
  const cartItem = await CartItem.getCartItemByOrderId(order[0].id);
  const payment = await Payment.getPaymentById(order[0].paymentId);
  const address = await Address.getAddressById(order[0].addressId);
  const customer = await Customer.getCustomerById(address.customerId);
  const account = await Account.getAccountById(order[0].accountId);
  const shipping = await ShippingInfo.getShippingInfoById(order[0].shippingId);
  return { ...order[0], cartItem, customer, payment, account, shipping };
};

const OrderDetail = {
  getAll: getAll,
  getOrderDetailById: getOrderDetailById,
  addOrderDetail: (orderDetail, callback) => {
    return connection.query(
      "insert into OrderDetail(code,paymentStatus,totalCost,paymentId,shippingId,accountId,addressId) values( ?,?,?,?,?,?,?);",
      [
        orderDetail.code,
        orderDetail.paymentStatus,
        orderDetail.totalCost,
        orderDetail.paymentId,
        orderDetail.shippingId,
        orderDetail.accountId,
        orderDetail.addressId,
      ],
      callback
    );
  },
  deleteOrderDetail: (id, callback) => {
    return connection.query(
      `update OrderDetail set status="DELETE" where id=?`,
      [id],
      callback
    );
  },
  updateOrderDetail: (orderDetail, callback) => {
    return connection.query(
      "update OrderDetail set code = ?, paymentStatus = ?,totalCost = ? paymentId= ?, shippingId = ?, accountId = ?, addressId= ? where id =?",
      [
        orderDetail.code,
        orderDetail.paymentStatus,
        orderDetail.totalCost,
        orderDetail.paymentId,
        orderDetail.shippingId,
        orderDetail.accountId,
        orderDetail.addressId,
        orderDetail.id,
      ],
      callback
    );
  },
};

module.exports = OrderDetail;
