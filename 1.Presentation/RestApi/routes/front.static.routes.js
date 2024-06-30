const express = require('express');
const path = require('path');
require('dotenv').config();

const router = express.Router();
const basePath = path.join(__dirname, '../', process.env.FRONTEND_PATH);

router.get('/registro.html', (req, res) => {
    res.sendFile(path.join(basePath, 'registro.html'));
});

router.get('/login.html', (req, res) => {
    res.sendFile(path.join(basePath, 'login.html'));
});

router.get('/catalogo.html', (req, res) => {
    res.sendFile(path.join(basePath, 'catalogo.html'));
});

router.get('/productos.html', (req, res) => {
    res.sendFile(path.join(basePath, 'productos.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'));
});

module.exports = router;

