const connection = require("../connection");
const Category = require("./Category");
const Image = require("./Image");

const getAll = async () => {
  let products = await connection.promiseQuery(
    'select * from Product where status="ACTIVE"'
  );
  const rowsPromise = products.map(async (product) => {
    const category = await Category.getCategoryById(product.categoryId);
    const image = await Image.getImageByProductId(product.id);
    return { ...product, category: category[0], image: image };
  });
  products = await Promise.all(rowsPromise);
  return products;
};

const getById = async (id) => {
  try {
    let product = await connection.promiseQuery(
      "select * from Product where id=?",
      [id]
    );
    const category = await Category.getCategoryById(product[0].categoryId);
    const image = await Image.getImageByProductId(product[0].id);

    return { ...product[0], category: category[0], image: image };
  } catch (error) {
    throw "Product Not Found";
  }
};

// const addProduct = async (product) =>{
//   try {
//     const addedProduct = await connection.promiseQuery(
//       "insert into Product(name,code,description,quantity,price,author,publisher,categoryId) values(?,?,?,?,?,?,?,?);",
//       [
//         product.name,
//         product.code,
//         product.description,
//         product.quantity,
//         product.price,
//         product.author,
//         product.publisher,
//         product.categoryId,
//       ]
//       )
//       const returnData = await getById(product.id);
//       return addedProduct;
//   } catch (error) {
//     throw error
//   }
 
// }

const Product = {
  getAll: getAll(),

  getProductById: getById,

  getProductByName: (name, callback) => {
    return connection.query(
      "select * from Product where name=?",
      [name],
      callback
    );
  },
  getProductByType: (type, callback) => {
    return connection.query(
      "select * from Product where type=?",
      [type],
      callback
    );
  },
  // addProduct: (product, callback) => {
  //   return connection.query(
  //     "insert into Product(name,code,description,quantity,price,author,publisher,categoryId) values(?,?,?,?,?,?,?,?);",
  //     [
  //       product.name,
  //       product.code,
  //       product.description,
  //       product.quantity,
  //       product.price,
  //       product.author,
  //       product.publisher,
  //       product.categoryId,
  //     ],
  //     callback
  //   );
  // },
  addProduct: addProduct,
  deleteProduct: (id, callback) => {
    return connection.query(
      `update Product set status="DELETE" where id = ?`,
      [id],
      callback
    );
  },
  updateProduct: (product, callback) => {
    return connection.query(
      "update Product set  name = ?, code =?, description = ?,quantity = ?, price = ?, author = ?, publisher = ?, categoryId=? where id =?",
      [
        product.name,
        product.code,
        product.description,
        product.quantity,
        product.price,
        product.author,
        product.publisher,
        product.categoryId,
        product.id,
      ],
      callback
    );
  },
};

module.exports = Product;
