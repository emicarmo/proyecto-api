const express = require('express');

class RestApiServer {
    constructor(){
        this.server = express;
        this.port = process.env.PORT
    }
}