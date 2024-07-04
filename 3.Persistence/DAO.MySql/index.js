// Barrel File: Un archivo barril agrupa y reexporta módulos desde un solo lugar, facilitando las importaciones en otros archivos
// Importamos el repositorio de libros desde la implementación específica en DAORepositories
const BookRepository = require('./DAORepositories/book.repository');
const CategoryRepository = require('./DAORepositories/category.repository');

// Exportamos el repositorio de libros en un objeto
module.exports = {

    BookRepository,
    CategoryRepository
};

