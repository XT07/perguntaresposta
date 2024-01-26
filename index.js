const express = require("express");
const ex = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const registerQuestion = require("./database/Questions");
const registerResponse = require("./database/Response");

connection
    .authenticate()
    .then(() => {
        console.log("Sistema conectado ao banco de dados")
    })
    .catch((err) => {
        console.log(err);
    })

ex.set("view engine", "ejs");
ex.use(express.static("public"));
ex.use(bodyParser.urlencoded({ extended: false }));
ex.use(bodyParser.json());

ex.get("/", (req, res) => {
    registerQuestion.findAll({ raw: true, order: [[ "id","DESC" ]] }).then((questions) => {
        res.render("home", {
            questions: questions
        })
    })
})

ex.get("/question", (req, res) => {
    res.render("question")
})

ex.post("/savequestion", (req, res) => {
    let titulo = req.body.title;
    let descricao = req.body.description;
    let opcao = req.body.option;
    registerQuestion.create({
        titulo: titulo,
        descricao: descricao,
        categoria: opcao
    }).then(() => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
})

ex.post("/response", (req, res) => {
    let id = req.body.id;
    registerQuestion.findAll({ where:{ id: id }, raw: true }).then((info) => {
        registerResponse.findAll({ where: { perguntaId: id }, order:[[ "id","DESC" ]], raw: true }).then((infoResponse) => {
            res.render("response", {
                info: info,
                infoResponse: infoResponse
            })
        })
    })
})

ex.post("/saveresponse", (req, res) => {
    let resposta = req.body.response;
    let perguntaId = req.body.perguntaId;
    registerResponse.create({
        resposta: resposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
})

ex.listen(8080, () => {
    console.log("Server on")
})