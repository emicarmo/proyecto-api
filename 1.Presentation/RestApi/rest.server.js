require('dotenv').config();
const express = require('express');
const cors = require('cors');

class RestApiServer {
    constructor() {
        this.server = express();
        this.port = process.env.RESTAPI_PORT || 3000;
        
        //Initialized middlewares
        this.middlewares();
        //Initialized Routes
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = RestApiServer;