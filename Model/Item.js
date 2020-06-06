const connection = require("../connection");
const Product = require("./Product");

const getAllItem = async () => {
  let items = await connection.promiseQuery(
    'Select * from Item where status = "ACTIVE"'
  );

  const itemResult = getProduct(items);
  return itemResult;
};

const getItem = async (id) => {
  let item = await connection.promiseQuery(`Select * from Item where id= ? `, [
    id,
  ]);
  const product = await Product.getProductById(item[0].productId);
  return { ...item[0], product: product };
};


const getSortByPage = async (page, sortType) => {
  // const keyword = "";
  // const type ="";
  // let items = null;
  // switch (sortType) {
  //   case 1:
  //     keyword = "id";
  //     type = "desc";
  //     // items = await connection.promiseQuery(
  //     //   `SELECT * FROM Item where status = "ACTIVE" order by id desc LIMIT 12 OFFSET ?`,
  //     //   [page * 12]
  //     // );
  //     break;
  //   case 2:
  //     keyword = "id";
  //     type = "asc";
  //     // items = await connection.promiseQuery(
  //     //   `SELECT * FROM Item where status = "ACTIVE" order by id asc LIMIT 12 OFFSET ? `,
  //     //   [page * 12]
  //     // );
  //     break;
  //   case 3:
  //     keyword = "sellingPrice";
  //     type = "desc";
  //     // items = await connection.promiseQuery(
  //     //   `SELECT * FROM Item where status = "ACTIVE" order by sellingPrice desc  LIMIT 12 OFFSET ? `,
  //     //   [page * 12]
  //     // );
  //     break;
  //   case 4:
  //     keyword = "sellingPrice";
  //     type = "asc";
  //     // items = await connection.promiseQuery(
  //     //   `SELECT * FROM Item where status = "ACTIVE" order by sellingPrice asc LIMIT 12 OFFSET ? `,
  //     //   [page * 12]
  //     //);
  //     break;
  // }

    if(sortType === 1 ){
      keyword = "id";
      type = "desc";
    }else if(sortType === 2 ){
      keyword = "id";
      type = "asc";
    }else if(sortType === 3 ){
      keyword = "sellingPrice,id";
      type = "desc";
    }else if(sortType === 4 ){
      keyword = "sellingPrice,id";
      type = "asc";
    } 
  let items = await connection.promiseQuery(
    `SELECT * FROM Item where status = "ACTIVE" order by ${keyword} ${type} LIMIT 12 OFFSET ?`,
    [page * 12]
  );
  

  const itemResult = getProduct(items);
  return itemResult;
};

    const getItemByPage = async (page) => {
      let items = await connection.promiseQuery(
        `SELECT * FROM Item where status = "ACTIVE" order by id desc LIMIT 12 OFFSET ?`,
        [page * 12]
      );
      const itemResult = getProduct(items);
      return itemResult;
    };

    


const getSearchItem = async (sortType) => {  
  let items = await connection.promiseQuery( 
    `SELECT * FROM Item i inner join product p on i.productID = p.id and i.status = p.status  where p.status = "ACTIVE" and p.name LIKE '%${sortType}%' order by p.name desc limit 12 offset 0`,
    
  );
 const itemResult =  getProduct(items);
      return itemResult;
};
const getProduct =(items) => {
  const itemPromise = items.map(async (item) => {
    const product = await Product.getProductById(item.productId);
    return { ...item, product: product };
  });

  items = Promise.all(itemPromise);
  return items;

}
const Item = {
  getAll: getAllItem,
  getItemById: getItem,
  getItemByPage: getItemByPage,
  getSortByPage: getSortByPage,
  getSearchItem: getSearchItem,

  addItem: (item, callback) => {
    return connection.query(
      "insert into Item(productId,sale,sellingPrice) value(?,?,?)",
      [item.productId, item.sale, item.sellingPrice],
      callback
    );
  },
  updateItem: (item, callback) => {
    return connection.query(
      "update Item set sale= ? ,sellingPrice = ? where id =?",
      [item.sale, item.sellingPrice, item.id],
      callback
    );
  },
  deleteItem: (id, callback) => {
    return connection.query(
      `update Item set status="DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = Item;
