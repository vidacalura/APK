const express = require("express");

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
                // Verifica se user existe no krunker
                // Passa para a API
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
            // Verifica se user existe no krunker
            // Passa para a API
        }
    }
    else {
        res.json({ "error": "Preencha todos os campos antes de enviar." });
    }
});

app.listen(5000);