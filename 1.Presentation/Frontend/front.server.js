const express = require('express');
const path = require('path');// Se requiere para las direcciones de archivos y directorios
//const FrontStaticRoutes = require('../RestApi/routes/front.static.routes'); // Importamos las rutas estaticas del frontend
require('dotenv').config();// Se requiere para usar variables de entorno

class FrontServer{
    constructor(){
        this.server = express();
        this.port = process.env.FRONTEND_PORT || 8080;// FRONTEND_PORT reperesenta el puerto del cliente -server frontend- en archivo .env // Se redunda agregando 8080 que es lo mismo que la variable de entorno

        //this.publicPath = path.join(__dirname, 'public');// Se agrega para ver Jonny en el mismo proyecto
        this.publicPath = path.join(__dirname, process.env.FRONTEND_PATH);// Se cambia para actualizar , comprobar si no hay error con basePath y eliminar basePath si sobra

        this.basePath = path.join(__dirname, process.env.FRONTEND_PATH);// Se modifica para usar variables del entorno
                console.log(`Base path desde front.server: ${this.basePath}`); // Para ver en que direccion esta buscando la ruta cargada en .env

        this.middlewares(); // Inicializa middlewares
        this.routes();// Inicializa las rutas
    }

    middlewares(){
        this.server.use(express.static(this.publicPath));// Se agrega para ver Jonny en el mismo proyecto // Posible conflicto ARREGLAR
        this.server.use(express.static(this.basePath)); // Se agrega para servir archivos estaticos desde el directorio del frontend: ProyectoCaC
        //Agregar aqui otros middleware (recordar importacion si es necesario)
    }

    routes(){
        //this.server.use('/api', FrontStaticRoutes); // Archivo de rutas del frontend para servir las solicitudes
    }        
    
    async start(){
        this.server.listen(this.port, ()=>{
            console.log(`Front server initiated on  port: ${this.port}`);
        });
    }

}


module.exports = FrontServer;


