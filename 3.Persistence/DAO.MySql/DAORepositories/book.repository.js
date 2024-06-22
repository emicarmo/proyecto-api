const BaseRepository = require('./base.repository');

class BookRepository extends BaseRepository {
    constructor(){
        super('libros');
    }

    // Metodos personalizados para los libros
    async findByIsbn(isbn){
        const sql = `SELECT * FROM ${this.tableName} WHERE isbn = ?`;
        return await this.query(sql, [isbn]);
    }

    async findByTitle(title){
        const sql = `SELECT * FROM ${this.tableName} WHERE name=?`;
        return await this.query(sql, [title]);
    }

    async filterByCategory(categoryId){
        const sql = `SELECT * FROM ${this.tableName} WHERE category_id=? LIMIT ${ this.pageSize } OFFSET ${ this.offset }`;
        return await this.query(sql, [categoryId]);
    }

}


module.exports = BookRepository;