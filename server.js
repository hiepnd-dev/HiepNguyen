const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./connection");
const Route = require("./Route/Route");

const app = express();
app.use((req, res, next) => {
  next(); // cho chuong trinh tiep tuc di
});
app.use(express.static("Asset"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(this.state)
app.use("/", Route);

app.listen(9605, (err) => {
  if (err) console.log(err);
  else console.log("Server started");
});

module.exports = connection;
