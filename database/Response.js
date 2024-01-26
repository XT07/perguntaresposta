const sequelize = require("sequelize");
const connection = require("./connection");

const register = connection.define("respostas", {
    resposta: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.STRING,
        allowNull: false
    }
})

register.sync({ force: false }).then(() => {
    console.log("Tabela sincronizada")
}).catch((err) => {
    console.log(err)
})

module.exports = register;