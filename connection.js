const mysql = require("mysql");

// const connection = mysql.createPool({
//   host: "us-cdbr-east-06.cleardb.net",
//   user: "b4017ae5636545",
//   password: "1e77a8bd",
//   database: "heroku_084d68dec8ca961",
//   multipleStatements: true,
//   connectionLimit: 10,
// });
// connection.on("error", function (err) {
//   console.log("Oh shit.");
//   throw err;
// });

const connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "htttql3",
});
//thay doi cai nay thanh db cua m

connection.connect((err) => {
  // if(err) throw err;hero
  //  connection.query("CREATE DATABASE Product", function(err, result) {
  //    if (err) throw err;
  //    console.log("Database created");
  //  });
  if (err) {
    console.log(err);
  } else {
    console.log("DATABASE CONNECTED");
  }
});

// const oldQuery = connection.query;
connection.promiseQuery = function (text,params) {
  return new Promise((resolve, reject) => {
    connection.query(text,params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = connection;
