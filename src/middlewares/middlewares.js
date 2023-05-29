const express = require("express");
const cors = require("cors");

const middlewares = (app) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ limit: "10mb" }));
};

module.exports = middlewares;
