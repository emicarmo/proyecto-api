const { request, response } = require('express');
const { BookModel } = require('../../../2.Domain/Models/index');
const { upload } = require('../../helpers/index');


class booksController {
    constructor(){
        // El controlador implementa directamente el repositorio de datos
        // aunque lo ideal seria utilizarlo a traves de los diferentes casos de uso o modelos
        // implementandos en domain, desde alli tambien se deberian realizar las validaciones y el mapeo entre
        // entidades.
        this.model = new BookModel();
    }

    // Query functions
    async getAll(req = request, res = response){
        const result = await this.model.getAll();
        res.json({
            result
        });
    }

    async getById(req = request, res = response){
        const id = req.params.id;
        const result = await this.model.getById(id);

        (result.length > 0)?res.json(result[0]): res.status('404').json();
    }

    // Commands functions
    async createBook(req = request, res = response){
        try{
            const image = await upload(req.files);

            const bookEntity = req.body;
            bookEntity.imagen = image;
            
            const result = await this.model.add(bookEntity);

            res.json({
                result,
                bookEntity
            });

        }catch(error){
            console.log(error);
            res.status(400).json({msg: error.message});
        }
    }

    async updateBook(req = request, res= response){
        const id = req.params.id;
        const bookEntity = req.body;
        const result = await this.model.update(bookEntity, id);
        res.json({
            result,
            id,
            bookEntity
        });
    }

    async deleteBook(req = request, res = response){
        const id = req.params.id;
        const result = await this.model.delete(id);
        res.json({
            result,
            id
        });
    }
    
}

module.exports = booksController;