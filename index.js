const express = require("express");
const { generateShortUrl, saveToDb, getFromDb } = require("./persistence");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({});
});

app.param("shortUrl", (req, res, next, shortUrl) => {
  getFromDb(shortUrl)
    .then((longUrl) => {
      req.longUrl = longUrl;
      next();
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.get("/:shortUrl", ({ longUrl }, res) => {
  res.redirect(longUrl);
});

app.post("/", async ({ body }, res) => {
  const shortUrl = generateShortUrl();
  await saveToDb(shortUrl, body.longUrl);
  res.status(200).json({
    longUrl: body.longUrl,
    shortUrl,
  });
});

const server = app.listen(3000);

module.exports = server;
