const express = require('express');
const cors = require('cors');
require('dotenv').config();//Se requiere para usar variables de entorno
const fileUpload = require('express-fileupload');

class RestApiServer {
    constructor() {
        this.server = express();
        this.port = process.env.RESTAPI_PORT;//RESTAPI_PORT reperesenta el puerto del servidor -server backend- en archivo .env
        
        this.middlewares();// Inicializo middleware
        this.routes();// Inicializo routes
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));// To manage file uploads
        //Agregar aqui otros middleware (recordar importacion si es necesario)
    }

    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
        this.server.use('/api', require('./routes/front.static.routes'));//Agregada para get /config en front.static
        this.server.use('/api/users', require('./routes/user.routes'));//Agregada para usuarios
        this.server.use('/api/categories', require('./routes/category.routes'));
        //Agregar aqui otras rutas
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
    
}


module.exports = RestApiServer;

