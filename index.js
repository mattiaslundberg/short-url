const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.status(200).json({});
});

const server = app.listen(3000);

module.exports = server;
