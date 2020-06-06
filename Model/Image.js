const connection = require("../connection");

const Image = {
  getAll: (callback) => {
    return connection.query(
      `Select * from Image where status="ACTIVE"`,
      callback
    );
  },

  getImageById: (id, callback) => {
    return connection.query("Select * from Image where id = ?", [id], callback);
  },
  getImageByProductId: async (id) => {
    const image = await connection.promiseQuery(
      `Select * from Image where productId=?`,
      [id]
    );
    return image;
  },
  addImage: (image, callback) => {
    return connection.query(
      "insert into Image(url,attribute,productId) value(?,?,?)",
      [image.url, image.attribute, image.productId],
      callback
    );
  },
  updateImage: (image, callback) => {
    return connection.query(
      "update Image set url = ?, attribute = ?  where id =?",
      [image.url, image.attribute, image.id],
      callback
    );
  },
  deleteImage: (id, callback) => {
    return connection.query(
      `update Image set status="DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Image;
