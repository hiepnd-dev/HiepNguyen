const connection = require("../connection");

const Category = {
  getAll: (callback) => {
    return connection.query(
      `Select * from Category where status="ACTIVE"`,
      callback
    );
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "Select * from Category where id = ?",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    })
      .then((rows) => {
        return rows;
      })
      .catch((err) => {
        throw err;
      });
  },
  addCategory: (category, callback) => {
    return connection.query(
      "insert into Category(name,description) value(?,?)",
      [category.name, category.description],
      callback
    );
  },
  updateCategory: (category, callback) => {
    return connection.query(
      "update Category set name = ?,description = ? where id =?",
      [category.name, category.description, category.id],
      callback
    );
  },
  deleteCategory: (id, callback) => {
    return connection.query(
      `update Category set status="DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Category;
