const express = require('express');
const router = express();
const cors = require('cors')

// Router
const categoria = require('../routes/categoria')
const libro = require('../routes/libro')

// Middlewares
router.use(cors());
router.use(express.json());
router.use('/categorias', categoria);
router.use('/libros', libro);

module.exports = router