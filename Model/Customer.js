const connection = require("../connection");
const Address = require("./Address");
const getAll = async () => {
  let customers = await connection.promiseQuery(
    'Select * from Customer where status="ACTIVE"'
  );
  const customerPromise = customers.map(async (customer) => {
    const address = await Address.getAddressByCustomerId(customer.id);
    return { ...customer, address };
  });
  customers = Promise.all(customerPromise);
  console.log(customers);
  return customers;
};

const getCustomerById = async (id) => {
  let customers = await connection.promiseQuery(
    "Select * from Customer where id=?",
    [id]
  );
  const address = await Address.getAddressByCustomerId(id);
  return { ...customers[0], address };
};

const Customer = {
  getAll: getAll,
  getCustomerById: getCustomerById,
  // getImageByCustomerId : (id)
  getCustomerByName: (name, callback) => {
    return connection.query(
      "select * from Customer where name=?",
      [name],
      callback
    );
  },

  addCustomer: (customer, callback) => {
    return connection.query(
      "insert into Customer(name,phone,age,sex,username,password) values(?,?,?,?,?,?);",
      [
        customer.name,
        customer.phone,
        customer.age,
        customer.sex,
        customer.username,
        customer.password,
      ],
      callback
    );
  },
  deleteCustomer: (id, callback) => {
    return connection.query(
      `update Customer set status="DELETE " where id = ?`,
      [id],
      callback
    );
  },
  updateCustomer: (customer, callback) => {
    return connection.query(
      "update Customer set  name = ?,phone = ?, age = ?, sex = ?, username =?,password= ?  where id =?",
      [
        customer.name,
        customer.phone,
        customer.age,
        customer.sex,
        customer.username,
        customer.password,
        customer.id,
      ],
      callback
    );
  },
};

module.exports = Customer;
