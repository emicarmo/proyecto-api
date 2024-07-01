//IMPORTS

// Importamos Router desde express, que nos permite crear manejadores de rutas modulares y montables, y el controlador de libros
const { Router } = require('express');
const BooksController = require('../controllers/book.controller');

//INSTANCIAS

// Creamos una instancia de Router y del controlador de libros
const router = Router();
const booksController = new BooksController(); 

// Definición de las rutas de consulta (Query Routes):
// Nota: Las rutas deben especificarse de la más específica a la menos específica para evitar conflictos.

router.get('/', booksController.getAll.bind(booksController)); // Ruta para obtener todos los libros
router.get('/:id', booksController.getById.bind(booksController)); // Ruta para obtener un libro por su ID

// Definición de las rutas de comando (Command Routes):

router.post('/', booksController.createBook.bind(booksController)); // Ruta para crear un nuevo libro
router.put('/:id', booksController.updateBook.bind(booksController)); // Ruta para actualizar un libro existente por su ID
router.delete('/:id', booksController.deleteBook.bind(booksController)); // Ruta para eliminar un libro por su ID

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;
