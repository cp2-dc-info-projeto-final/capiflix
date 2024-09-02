const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public',"cadastro.html"));
});

app.listen(PORT, () => {
    console.log("Servidor iniciado na porta " + PORT);
});

app.post('/send-information', (req, res) => {
    const {nome_de_usuario, email, senha, confirmacao_senha} = req.body;
    if (nome_de_usuario.length < 1 || email.length < 1 || senha.length < 1 || confirmacao_senha.length < 1) {
        res.status(200).json({
            status: 'failed',
            message: 'Por favor, preencha todos os campos corretamente!',
        });
    } else if (senha != confirmacao_senha) {
        res.status(200).json({
            status: 'failed',
            message: 'As senhas digitadas não são iguais!',
        });
    } else {
        const db = new sqlite3.Database('./capiflix_db/banco_de_dados.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Conectou com o banco de dados!");
        });
        db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)',
        [nome_de_usuario, email, senha], (err) => {
            if(err){
                console.error(err.message);
            }
        });
        
        db.close((err) => {
            if(err){
                return console.error(err.message);
            }
                console.log("Fechou a conexão com o banco de dados!");
        });
        res.status(200).json({
            status: 'success',
            message: 'Registro feito com sucesso!',
            campos: req.body
    })
}});
app.listen(PORT, () => {
    console.log('Servidor iniciado na porta 8080');
});