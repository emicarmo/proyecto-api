// Importamos el repositorio base que contiene las operaciones comunes para todos los repositorios
const BaseRepository = require('./base.repository');

// Definimos la clase BookRepository que extiende de BaseRepository
class BookRepository extends BaseRepository {
    constructor(){
        // Llamamos al constructor de la clase base, pasando el nombre de la tabla 'libros'
        super('libros');
    }
}

// Exportamos la clase BookRepository para que pueda ser utilizada en otros archivos
module.exports = BookRepository;
