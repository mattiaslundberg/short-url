const app = require("./app");

let server;
if (process.env.NODE_ENV == "test") {
  server = app.listen(3001);
} else {
  server = app.listen(3000);
}

module.exports = server;
