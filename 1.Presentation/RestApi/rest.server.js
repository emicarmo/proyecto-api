const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class RestApiServer {
    constructor() {
        this.server = express();
        this.port = process.env.API_PORT;
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
    }
    
    routes() {
        this.server.use('/api/books', require('./routes/book.routes'));
        this.server.use('/api/users', require('./routes/user.routes'));
        this.server.use('/api/categories', require('./routes/category.routes'));
        this.server.use('/images', express.static(path.join(__dirname, '../', 'images')));
        // this.server.use('/api/images', (req, res)=>{ res.json(path.join(__dirname, '../', 'images')) });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Rest Api server initiated on  port: ${this.port}`);
        });
    }
    
}


module.exports = RestApiServer;

