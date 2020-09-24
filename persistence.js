const redis = require("redis");
const client = redis.createClient();

const generateShortUrl = () => {
  return [...Array(12)].map(() => Math.random().toString(36)[2]).join("");
};

const saveToDb = (shortUrl, longUrl) => {
  return new Promise((resolve, reject) => {
    client.set(shortUrl, longUrl, (e, res) => {
      if (e) {
        reject(new Error(e));
      } else {
        resolve(res);
      }
    });
  });
};

const getFromDb = (shortUrl) => {
  return new Promise((resolve, reject) => {
    client.get(shortUrl, (e, res) => {
      if (e || !res) {
        reject(new Error(e));
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { generateShortUrl, saveToDb, getFromDb };
