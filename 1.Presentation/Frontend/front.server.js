const express = require('express');
const path = require('path');

class FrontServer{
    constructor(){
        this.server = express();
        this.port = 8080;// Se agregan variables de entorno para el puerto
        //this.basePath = path.join(__dirname, 'Presentation', 'RestApi');// Por favor, expicar cual es el objetivo futuro de esta linea?
        this.basePath = path.join(__dirname, process.env.FRONTEND_PATH);// Se modifica linea anteriuor para usar variables del entorno
            console.log(`Base path: ${this.basePath}`); // Para ver en que direccion esta buscando la ruta cargada en .env
        this.middlewares(); //Initialized middlewares
    }

    middlewares(){
        //this.server.use(express.json());
        this.server.use(express.static(this.basePath)); // Se agrega para servir archivos estaticos desde el directorio del frontend: ProyectoCaC
    }
    
    async start(){
        this.server.listen(this.port, ()=>{
            console.log(`Front server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = FrontServer;