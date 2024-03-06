require("dotenv").config();
const fs = require("fs");

const connection = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "mysql",
  timezone: "+03:00",
  dialectOptions: {
    charset: "utf8mb4",
  },
  logging: false
};

module.exports = {
  development: connection,
  test: connection,
  production: connection,
};
