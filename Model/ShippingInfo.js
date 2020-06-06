const connection = require("../connection");

const ShippingInfo = {
  getAll: (callback) => {
    return connection.query(
      `Select * from ShippingInfo where status="ACTIVE"`,
      callback
    );
  },

  getShippingInfoById:async (id) => {
    const shipping = await connection.promiseQuery("Select * from ShippingInfo where id =?",[id]);
    return shipping[0]
  },
  addShippingInfo: (shippingInfo, callback) => {
    return connection.query(
      "insert into ShippingInfo(type,address,cost) value(?,?,?)",
      [
        shippingInfo.type,
        shippingInfo.address,
        shippingInfo.cost,
      ],
      callback
    );
  },
  updateShippingInfo: (shippingInfo, callback) => {
    return connection.query(
      "update ShippingInfo set type = ?, address = ?, cost = ? where id =?",
      [
        shippingInfo.type,
        shippingInfo.address,
        shippingInfo.cost,
        shippingInfo.id,
      ],
      callback
    );
  },
  deleteShippingInfo: (id, callback) => {
    return connection.query(
      "delete from ShippingInfo where id = ?",
      [id],
      callback
    );
  },
};

module.exports = ShippingInfo;
