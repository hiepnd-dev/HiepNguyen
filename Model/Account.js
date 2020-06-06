const connection = require("../connection");

const getById = async (id) => {
  let account = await connection.promiseQuery(
    "Select * from Account where id = ?",
    [id]
  );
  return account[0]
};

const Account = {
  getAll: (callback) => {
    return connection.query(
      `Select * from Account where status = "ACTIVE"`,
      callback
    );
  },

  getAccountById: getById,
  getAccountByName: (username, callback) => {
    return connection.query(
      `Select * from Account where username = ? and status = "ACTIVE"`,
      [username],
      callback
    );
  },
  addAccount: (account, callback) => {
    return connection.query(
      "insert into Account(username,password,fullName,role) value(?,?,?,?)",
      [account.username, account.password, account.fullName, account.role],
      callback
    );
  },
  updateAccount: (account, callback) => {
    return connection.query(
      "update Account set password = ?, fullName = ?,role = ? where id =?",
      [
        account.password,
        account.fullName,
        account.role,
        account.id,
      ],
      callback
    );
  },
  deleteAccount: (id, callback) => {
    return connection.query(
      `update Account set status = "DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Account;
