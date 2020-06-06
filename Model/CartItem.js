const connection = require("../connection");
const Item = require("../Model/Item")

const getById = async (id)=>{
  let cart = await connection.promiseQuery(
    "Select * from CartItem where id = ?",[id]
  );
  const item = await Item.getItemById(cart[0].itemId);
  return {...cart[0],item}
}

const getCartItemByOrderId = async (id)=>{
  let carts = await connection.promiseQuery('Select * from CartItem where orderId= ? and status = "ACTIVE"',[id])

  const cartPromises = carts.map(async (cart) =>{
      const item = await Item.getItemById(cart.itemId);
      return {...cart,item}
  })
  carts = Promise.all(cartPromises);
  return carts;
}

const CartItem = {
  getAll: (callback) => {
    return connection.query(
      `Select * from CartItem where status="ACTIVE"`,
      callback
    );
  },

  getCartItemById: getById,
  getCartItemByOrderId: getCartItemByOrderId,
  addCartItem: (cartItem, callback) => {
    return connection.query(
      "insert into CartItem(orderId,itemId,quantity,cost) value(?,?,?,?)",
      [cartItem.orderId, cartItem.itemId, cartItem.quantity, cartItem.cost],
      callback
    );
  },
  updateCartItem: (cartItem, callback) => {
    return connection.query(
      "update CartItem set  quantity = ?,cost= ? where id =?",
      [
        cartItem.quantity,
        cartItem.cost,
        cartItem.id,
      ],
      callback
    );
  },
  deleteCartItem: (id, callback) => {
    return connection.query(
      `update CartItem set status="DELETE " where id = ?`,
      [id],
      callback
    );
  },
};

module.exports = CartItem;
