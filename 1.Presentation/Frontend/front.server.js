const express = require('express');
const path = require('path');// Se requiere para las direcciones de archivos y directorios
require('dotenv').config();// Se requiere para usar variables de entorno

class FrontServer{
    constructor(){
        this.server = express();
        this.port = process.env.FRONTEND_PORT;// FRONTEND_PORT reperesenta el puerto del cliente -server frontend- en archivo .env
        
        this.basePath = path.join(__dirname, process.env.FRONTEND_PATH);// Se modifica para usar variables del entorno
            console.log(`Base path: ${this.basePath}`); // Para ver en que direccion esta buscando la ruta cargada en .env
        this.middlewares(); // Inicializa middlewares
        this.routes();// Inicializa las rutas
    }

    middlewares(){
        this.server.use(express.static(this.basePath)); // Se agrega para servir archivos estaticos desde el directorio del frontend: ProyectoCaC
        //Agregar aqui otros middleware (recordar importacion si es necesario)
    }

    routes(){
        this.server.use('/', require('../RestApi/routes/front.static.routes')); // Importa y usa el archivo de rutas del frontend para servir las solicitudes
    }
    
    async start(){
        this.server.listen(this.port, ()=>{
            console.log(`Front server initiated on  port: ${this.port}`);
        });
    }

}


module.exports = FrontServer;

