
const startDatabase = require("./database");
const { startServer } = require("./server");

const connect = () => {
  startDatabase()
  startServer();
};

module.exports = { connect };