const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const startDatabase = () => {
  const url = process.env.DBURL;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(url, options);
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "db connection error"));
  db.once("open", () => {
    console.log(`Database connected`);
  });
};

module.exports = startDatabase;
