const connection = require("../connection");

const Address = {
  getAll: (callback) => {
    return connection.query(
      `Select * from Address where status = "ACTIVE"`,
      callback
    );
  },

  getAddressById: async (id) => {
    const address = await connection.promiseQuery(
      "Select * from Address where id=?",
      [id]
    );
    return address[0];
  },
  getAddressByCustomerId: async (id) => {
    const addresses = await connection.promiseQuery(
      'Select * from Address where customerId=? and status = "ACTIVE"',
      [id]
    );
    return addresses;
  },
  addAddress: (address, callback) => {
    return connection.query(
      "insert into Address(address,zipCode,isDefault,customerId) value(?,?,?,?)",
      [address.address, address.zipCode, address.isDefault, address.customerId],
      callback
    );
  },
  updateAddress: (address, callback) => {
    return connection.query(
      "update Address set address = ?, zipCode = ?, isDefault = ?,customerId = ? where id =?",
      [
        address.address,
        address.zipCode,
        address.isDefault,
        address.customerId,
        address.id,
      ],
      callback
    );
  },
  deleteAddress: (id, callback) => {
    return connection.query(
      `update Address set status = "DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Address;
