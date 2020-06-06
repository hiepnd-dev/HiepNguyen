const connection = require("../connection");

const Payment = {
  getAll: (callback) => {
    return connection.query(
      `Select * from Payment where status = "ACTIVE"`,
      callback
    );
  },

  getPaymentById: async (id) => {
    const payment = await connection.promiseQuery("Select * from PaymentMethod where id= ?",[id]);
    return payment[0];
  },

  addPayment: (Payment, callback) => {
    return connection.query(
      "insert into PaymentMethod(method,ownerName,ownerCardNumber) value(?,?,?)",
      [Payment.method, Payment.ownerName, Payment.ownerCardNumber],
      callback
    );
  },
  updatePayment: (Payment, callback) => {
    return connection.query(
      "update PaymentMethod set method = ?, ownerName = ?, ownerCardNumber = ? where id =?",
      [Payment.method, Payment.ownerName, Payment.ownerCardNumber, Payment.id],
      callback
    );
  },
  deletePayment: (id, callback) => {
    return connection.query(
      `update PaymentMethod set status = "DELETE" where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Payment;
