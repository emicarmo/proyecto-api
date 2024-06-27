const express = require('express');

class RestApiServer {
    constructor(){
        this.server = express;
        this.port = process.env.RESTAPI_PORT || 2000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use('/api/books', require('./routes/categoria.routes'));
    }

    start(){
        this.server.listen(this.port, ()=>{
            console.log(`Rest Api service initiated on port: ${this.port}`);
        })
    }
}

module.exports = RestApiServer;