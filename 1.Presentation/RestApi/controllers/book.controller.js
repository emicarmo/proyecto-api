const { request, response } = require('express');

class booksController {
    // Query functions
    getAll(req = request, res = response){
        res.json({
            msg: 'Return a list of paginate books'
        });
    }
    
    getById(req = request, res = response){
        let { id } = req.params;
        res.json({
            msg: 'Ok',
            id
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

    updateBook(req = request, res = response){
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