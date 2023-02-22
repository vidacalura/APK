const db = require("../db/db");

const express = require("express");
const router = express.Router();

/* Routes */
router.get("/ranking/times", async (req, res) => {
    
    db.promise()
    .execute("SELECT nome_time, lider, membro2, membro3, membro4 FROM TimesAPK;")
    .then(([rows]) => {
        res.status(200).json({
            times: rows
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ "error": "Erro ao conectar com o banco de dados" })
    })

});

router.post("/times", async (req, res) => {
    const { nomeTime, lider, membro2, membro3, membro4, token } = req.body;

    if (token == process.env.token) {
        if (nomeTime && lider && membro2 && membro3 && membro4) {
            db.promise()
            .execute("INSERT INTO TimesAPK_temp (nome_time, lider, membro2, membro3, membro4) \
            VALUES(?, ?, ?, ?, ?);", [
                nomeTime,
                lider,
                membro2,
                membro3,
                membro4
            ])
            .then(() => {
                res.status(200).json({ "message": "A APK recebeu seu pedido de cadastro de times com sucesso" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ "error": "Erro ao cadastrar time. Tente novamente mais tarde" });
            })
        }
        else {
            res.status(422).json({ "error": "Dados insuficientes" });
        }
    }
    else {
        res.status(401).json({ "error": "Permissão negada" });
    }

});

router.get("/ranking/individual/fev2023", async (req, res) => {

    db.promise()
    .execute("SELECT username, posicao FROM IndividualAPK_02_2023 ORDER BY posicao;")
    .then(([rows]) => {
        res.status(200).json({ "ranking": rows });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ "error": "Erro ao conectar com o banco de dados." });
    });
    
});

router.post("/individual", async (req, res) => {
    const { username, token } = req.body;

    if (token == process.env.token) {
        if (username) {
            db.promise()
            .execute("INSERT INTO IndividualAPK_temp (username) VALUES(?);", [
                username
            ])
            .then(() => {
                res.status(200).json({ "message": "Jogador cadastrado com sucesso" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ "error": "Erro ao cadastrar jogador. Tente novamente mais tarde" });
            })
        }
        else {
            res.status(422).json({ "error": "Dados insuficientes" });
        }
    }
    else {
        res.status(401).json({ "error": "Permissão negada" });
    }

});


module.exports = router;