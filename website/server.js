require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json())
app.use(express.static("./public/"));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

app.get("/inscricao-time", (req, res) => {
    res.sendFile("./public/inscricaotime.html", { root: __dirname });
});

app.get("/inscricao-individual", (req, res) => {
    res.sendFile("./public/inscricao.html", { root: __dirname });
});

app.get("/torneio", (req, res) => {
    res.sendFile("./public/torneio.html", { root: __dirname });
});

app.post("/inscricao-time", async (req, res) => {
    const { nomeTime, lider, membro2, membro3, membro4 } = req.body;

    if (nomeTime.length < 30 && nomeTime.length > 3){
        if (nomeTime && lider && membro2 && membro3 && membro4){
            if (lider.length > 24 || membro2.length > 24 || membro3.length > 24
                || membro4.length > 24){
                    res.json({ "error": "Username deve conter menos que 24 caracteres." });
            }
            else {
                await fetch(process.env.API + "times", {
                    method: "POST",
                    headers: {
                        "Content-type": "Application/JSON"
                    },
                    body: JSON.stringify({
                        nomeTime: nomeTime.trim(),
                        lider: lider.trim(),
                        membro2: membro2.trim(),
                        membro3: membro3.trim(),
                        membro4: membro4.trim(),
                        token: process.env.token
                    })
                })
                .then((response) => { return response.json(); })
                .then((response) => {
                    res.json(response);
                });
            }
        }
        else {
            res.json({ "error": "Preencha todos os campos antes de enviar." });
        }
    }
    else {
        res.json({ "error": "Nome do time deve conter entre 3 e 30 caracteres." });
    }
});

app.post("/inscricao-individual", async (req, res) => {
    const { username } = req.body;

    if (username){
        if (username.length > 24){
            res.json({ "error": "Username deve conter menos que 24 caracteres." });
        }
        else {
            await fetch(process.env.API + "individual", {
                method: "POST",
                headers: {
                    "Content-type": "Application/JSON"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    token: process.env.token
                })
            })
            .then((response) => { return response.json(); })
            .then((response) => {
                res.json(response);
            });
        }
    }
    else {
        res.json({ "error": "Preencha todos os campos antes de enviar." });
    }
});

const port = process.env.PORT || 5000;
app.listen(port);