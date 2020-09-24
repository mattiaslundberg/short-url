const generateShortUrl = (longUrl) => {
  return [...Array(12)].map(() => Math.random().toString(36)[2]).join("");
};

module.exports = { generateShortUrl };
