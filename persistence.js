const redis = require("redis");

const generateShortUrl = () => {
  return [...Array(12)].map(() => Math.random().toString(36)[2]).join("");
};

const saveToDb = (shortUrl, longUrl) => {
  const client = redis.createClient();
  return new Promise((resolve, reject) => {
    client.set(shortUrl, longUrl, (e, res) => {
      client.quit();
      if (e) {
        reject(new Error(e));
      } else {
        resolve(res);
      }
    });
  });
};

const getFromDb = (shortUrl) => {
  const client = redis.createClient();
  return new Promise((resolve, reject) => {
    client.get(shortUrl, (e, res) => {
      client.quit();
      if (e || !res) {
        reject(new Error(e));
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { generateShortUrl, saveToDb, getFromDb };
