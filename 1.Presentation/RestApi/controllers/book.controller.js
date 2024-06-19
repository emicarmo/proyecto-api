const { request, response } = require('express');
const BookModel = require('../../../3.Persistence/DAO.MySql/DAOModels/book.model');



class booksController {
    constructor(){
        // El controlador implementa directamente el modelo de datos
        // aunque lo ideal seria utilizarlo a traves de los diferentes casos de uso
        // implementandos en domain, desde alli tambien se deberian realizar las validaciones y el mapeo entre
        // entidades.
        this.bookModel = new BookModel();
    }

    // Query functions
    async getAll(req = request, res = response){
        const result = await this.bookModel.findAll();
        res.json({
            msg: 'Return a list of paginate books',
            result
        });
    }
    
    async getById(req = request, res = response){
        let { id } = req.params;
        this.bookModel.id = id;
        const result = await this.bookModel.findById();
        if(result.length > 0){
            res.json({
                msg: 'Ok',
                result
            });
            return;    
        }

        res.status(404).json({
            msg: 'Not Found'
        })
    }
    getByIsbn(req = request, res = response){
        let { isbn } = req.params;
        res.json({
            msg: 'Ok',
            isbn
        })
    }
    
    getByTitle(req = request, res = response){
        let { title } = req.params;
        res.json({
            msg: 'Ok',
            title
        })
    }
    
    getByAuthor(req = request, res = response){
        let { author } = req.params;
        res.json({
            msg: 'Ok',
            author
        })
    }
    
    //TODO: Implement te advance search
    advanceSearch(req = request, res = response){
        res.json({
            msg: 'To be implemented'
        })
    }

    // Commands functions
    createBook(req = request, res = response){
        res.json({
            msg: 'Resource created'
        });
    }

    editBook(req = request, res= response){
        res.json({
            msg: 'Resource edited'
        });
    }

    //TODO: Investigar que devuelven los comandos sql para poder tomar decisiones de respuesta.
    //Nota: toda la logica de mapeo quedaria mejor si se implementa en Domain.
    updateBook(req = request, res = response){
        this.bookModel.id = 2;
        this.bookModel.title = 'Calculus'
        this.bookModel.author = 'Thomas Edinson';
        this.bookModel.update();
        res.json({
            msg: 'Resource updated'
        });
    }

    removeBook(req = request, res = response){
        res.json({
            msg: 'Resource Deleted'
        });
    }
    
}


module.exports = booksController;