const { Router } = require('express');
const BooksController = require('../controllers/book.controller');

const router = Router();
const booksController = new BooksController(); 


// Query Routes Definition:
// Note: Routes must be specified from most specific to least specific.

router.get('/search', booksController.advanceSearch);
router.get('/isbn/:isbn', booksController.getByIsbn);
router.get('/title/:title', booksController.getByTitle);
router.get('/author/:author', booksController.getByAuthor);
router.get('/:id', booksController.getById);
router.get('/', booksController.getAll);

// Command routes definition:
router.post('/', booksController.createBook);
router.put('/:id', booksController.editBook);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.removeBook);


module.exports = router;