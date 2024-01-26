const sequelize = require("sequelize");
const connection = require("./connection");

const register = connection.define("perguntas", {
    titulo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    categoria: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

register.sync({ force: false }).then(() => {
    console.log("Tabela sincronizada")
}).catch((err) => {
    console.log(err);
})

module.exports = register;