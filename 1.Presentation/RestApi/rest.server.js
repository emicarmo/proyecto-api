const express = require('express');
const path = require('path');

class RestApiServer{
    constructor(){
        this.server = express();
        this.port = 3000;
        this.basePath = path.join(__dirname, 'Presentation', 'RestApi');
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use('/api/books', require('./routes/book.routes'));
    }

    start(){
        this.routes();
        this.middlewares();
        this.server.listen(this.port, ()=>{
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = RestApiServer;