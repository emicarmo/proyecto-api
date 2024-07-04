// Importamos express, que es el framework para crear servidores HTTP en Node.js, y path, que es un módulo de Node.js para trabajar con rutas de archivos y directorios
const express = require('express');
const path = require('path');
require('dotenv').config();

// Definimos la clase FrontServer que manejará nuestro servidor del frontend
class FrontServer {
    constructor() {
        // Inicializamos una instancia de un servidor Express
        this.server = express();

        this.port = process.env.FRONTEND_PORT || 8080;
        
        //this.publicPath = path.join(__dirname, 'public');
        this.basePath = path.join(__dirname, process.env.FRONTEND_PATH)
        
        this.middlewares(); //Initialized middlewares
    }

    middlewares(){
        //this.server.use(express.json());
        //this.server.use(express.static(this.publicPath)); // Se agrega para servir archivos estaticos desde el directorio del frontend: ProyectoCaC
        this.server.use(express.static(this.basePath));

    }

    // Método para iniciar el servidor
    async start() {
        // Hacemos que el servidor escuche en el puerto definido y mostramos un mensaje en la consola cuando esté listo
        this.server.listen(this.port, () => {
            console.log(`Front server initiated on port: ${this.port}`);
        });
    }
}

// Exportamos la clase FrontServer para que pueda ser utilizada en otros archivos
module.exports = FrontServer;
