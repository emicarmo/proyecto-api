const BaseRepository = require('./base.repository');

class BookRepository extends BaseRepository {
    constructor(){
        super('libros');
    }
}


module.exports = BookRepository;