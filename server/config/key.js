const environment = process.env.NODE_ENV;

if (environment === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
