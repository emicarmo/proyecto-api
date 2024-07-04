require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

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
        // To manage file uploads
        this.server.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
    }

    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
        this.server.use('/api/categories', require('./routes/category.routes'));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
}

module.exports = RestApiServer;