// Cargamos las variables de entorno desde un archivo .env
require('dotenv').config();

//IMPORTS

// Importamos express, que es el framework para crear servidores HTTP en Node.js, y cors, para manejar las políticas de Cross-Origin Resource Sharing
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Definimos la clase RestApiServer que manejará nuestro servidor de API REST
class RestApiServer {
    constructor() {
        // Inicializamos una instancia de un servidor Express
        this.server = express();

        // Definimos el puerto en el que correrá el servidor, obteniéndolo de las variables de entorno o usando el puerto 3000 por defecto
        this.port = process.env.RESTAPI_PORT || 3000;
        
        // Inicializamos los middlewares y las rutas
        this.middlewares();
        this.routes();
    }

    // Método para configurar los middlewares
    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        // To manage file uploads
        this.server.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
    }

    // Método para configurar las rutas
    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
        this.server.use('/api/categories', require('./routes/category.routes'));
    }

    // Método para iniciar el servidor
    start() {
        // Hacemos que el servidor escuche en el puerto definido y mostramos un mensaje en la consola cuando esté listo
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on port: ${this.port}`);
        });
    }
}

// Exportamos la clase RestApiServer para que pueda ser utilizada en otros archivos
module.exports = RestApiServer;
