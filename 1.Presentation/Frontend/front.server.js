const express = require('express');
const path = require('path');
require('dotenv').config();

class FrontServer{
    constructor(){
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
    
    async start(){
        this.server.listen(this.port, ()=>{
            console.log(`Front server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = FrontServer;