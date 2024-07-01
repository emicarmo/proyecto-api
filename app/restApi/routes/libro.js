const express = require('express');
const router = express.Router();
const Respuesta = require('../models/Respuesta');
const db = require('../../database/db.config');

router.get('/', (req, res)=>{
    db.query('select * from libros', (err, results)=>{
        if (err){
            const respuesta = new Respuesta(false, 404, 'Error 404 Not Found, no se encontro libros', false)
            res.json(respuesta)
        }
        res.json(results);
    })
})

module.exports = router