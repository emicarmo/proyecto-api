const BaseRepository = require('./base.repository');

class BookRepository extends BaseRepository { //Se crea una clase pára book que estiende de BaseRepository
    constructor(){
        super('libros'); // Al inicializar BaseRepository con el nombre de la tabla libros todas las operaciones definidas en BaseRepository se aplican a la tabla libros
    }

}


module.exports = BookRepository;