const baseRepository = require('./base.repository');

class CategoryRepository extends baseRepository{
    constructor(){
        super('libros');
    }

    async findAll(){
        const sql = `SELECT * FROM categorias`;
        return await this.query(sql);
    }
}

module.exports = CategoryRepository;