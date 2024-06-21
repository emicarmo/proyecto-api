const { request, response } = require('express');
const { BookRepository } = require('../../../3.Persistence/DAO.MySql');


class booksController {
    constructor(){
        // El controlador implementa directamente el repositorio de datos
        // aunque lo ideal seria utilizarlo a traves de los diferentes casos de uso o modelos
        // implementandos en domain, desde alli tambien se deberian realizar las validaciones y el mapeo entre
        // entidades.
        this.bookRepository = new BookRepository();
    }

    // Query functions
    async getAll(req = request, res = response){
        const result = await this.bookRepository.findAll();
        res.json({
            msg: 'Return a list of paginate books',
            result
        });
    }
    
    async getById(req = request, res = response){
        let { id } = req.params;
        this.bookRepository.id = id;
        const result = await this.bookRepository.findById();
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
    async createBook(req = request, res = response){
        const fields = [
            "nombre",
            "categoria_id",
            "editorial",
            "precio",
            "stock",
            "descripcion",
            "imagen"
        ]

        const values = [
            `"${req.body.name}"`,
            `"${req.body.category}"`,
            `"${req.body.publishing}"`,
            `"${req.body.price}"`,
            `"${req.body.stock}"`,
            `"${req.body.description}"`,
            `"${req.body.image}"`,
            
        ]
        const result = await this.bookRepository.add(fields, values);

        res.json({
            result
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
        this.bookRepository.id = 2;
        this.bookRepository.title = 'Calculus'
        this.bookRepository.author = 'Thomas Edinson';
        this.bookRepository.update();
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