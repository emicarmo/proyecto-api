// Importamos express, que es el framework para crear servidores HTTP en Node.js, y path, que es un módulo de Node.js para trabajar con rutas de archivos y directorios
const express = require('express');
const path = require('path');

// Definimos la clase FrontServer que manejará nuestro servidor del frontend
class FrontServer {
    constructor() {
        // Inicializamos una instancia de un servidor Express
        this.server = express();

        // Definimos el puerto en el que correrá el servidor, en este caso, el puerto 8080
        this.port = 8080;

        // Definimos la ruta a la carpeta 'public', que contendrá los archivos estáticos del frontend
        this.publicPath = path.join(__dirname, 'public');

        // Inicializamos los middlewares
        this.middlewares();
    }

    // Método para configurar los middlewares
    middlewares() {
        this.server.use(express.static(this.publicPath)); // Middleware para servir archivos estáticos desde el directorio 'public'
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
