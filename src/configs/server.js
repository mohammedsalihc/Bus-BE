const express = require("express");
const dotenv = require("dotenv");
const middlewares = require("../middlewares/middlewares");
const { EndPoints } = require("../routes");

dotenv.config();

const app = express();

const startServer = () => {
  let port = 8090;
  middlewares(app);
  EndPoints(app);
  const server = app.listen(port, () =>
    console.log(`server started port ${port}`)
  );
};

module.exports = { startServer };
