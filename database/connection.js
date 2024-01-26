const sequelize = require("sequelize");

const connection = new sequelize("perguntaresposta", "root", "89171304", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;