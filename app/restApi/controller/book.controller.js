const { request, response } = require('express');


class bookController{
    constructor(){
        
    }

    async getAll(req = request, res = response){
        const result = await this.model.getAll();
        res.json({
            result
        })
    }
}


module.exports = bookController;