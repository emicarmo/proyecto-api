const { Router } = require('express');
const BooksController = require('../controllers/book.controller');

const router = Router();
const booksController = new BooksController(); 


// Query Routes Definition:
// Note: Routes must be specified from most specific to least specific.
/// Es necesario bindear hacia la instancia de la clase para que no se pierda el contexto *
router.get('/', booksController.getAll.bind(booksController));

// Command routes definition:
router.post('/', booksController.createBook.bind(booksController));
router.put('/:id', booksController.editBook.bind(booksController));
//router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.removeBook.bind(booksController));


module.exports = router;