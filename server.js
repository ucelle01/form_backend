const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para processar dados do formulário
app.use(express.json());
app.use(cors());

// Carrega os votos do arquivo JSON
let votos = JSON.parse(fs.readFileSync('votos.json', 'utf-8'));

// Rota para exibir votos atuais (opcional, para monitorar)
app.get('/votos', (req, res) => {
    res.json(votos);
});

// Rota para registrar um voto
app.post('/votar', (req, res) => {
    const candidato = req.body.candidato;

    if (votos[candidato] !== undefined) {
        votos[candidato]++;
        fs.writeFileSync('votos.json', JSON.stringify(votos, null, 2));
        res.json({ message: `Voto registrado para ${candidato}!` });
    } else {
        res.status(400).json({ message: 'Candidato inválido!' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});