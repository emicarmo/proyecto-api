const express = require('express');
require('dotenv').config();//Se requiere para usar variables de entorno

class RestApiServer {
    constructor() {
        this.server = express();
        this.port = process.env.RESTAPI_PORT;//RESTAPI_PORT reperesenta el puerto del servidor -server backend- en archivo .env
        
        this.middlewares();// Inicializo middleware
        this.routes();// Inicializo routes
    }

    middlewares() {
        this.server.use(express.json());
        //Agregar aquí otros middleware (recordar importacion si es necesario)
    }

    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
        //Agregar aquí otras rutas
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = RestApiServer;

