const path = require("path");
const express = require("express");
const { generateShortUrl, saveToDb, getFromDb } = require("./persistence");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/global.css", (_, res) => {
  res.sendFile(path.join(__dirname, "public/global.css"));
});

app.get("/build/bundle.js", (_, res) => {
  res.sendFile(path.join(__dirname, "public/build/bundle.js"));
});

app.get("/build/bundle.css", (_, res) => {
  res.sendFile(path.join(__dirname, "public/build/bundle.css"));
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

app.post("/", async ({ body, headers }, res) => {
  const shortUrl = `http://${headers.host}/${generateShortUrl()}`;
  await saveToDb(shortUrl, body.longUrl);
  res.status(200).json({
    longUrl: body.longUrl,
    shortUrl,
  });
});

module.exports = app;
