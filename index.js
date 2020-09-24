const express = require("express");
const { generateShortUrl } = require("./persistence");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({});
});

app.post("/", ({ body }, res) => {
  res.status(200).json({
    longUrl: body.longUrl,
    shortUrl: generateShortUrl(body.longUrl),
  });
});

const server = app.listen(3000);

module.exports = server;
