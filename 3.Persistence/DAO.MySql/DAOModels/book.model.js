const BaseModel = require('./basemodel');

class BookModel extends BaseModel {
    constructor(){
        super('books');
        this.id = null;
        this.title = null;
        this.author = null;
        this.isbn = null;
    }

    async findByIsbn(){
        const sql = `SELECT * FROM ${this.tableName} WHERE isbn = ?`;
        return await this.query(sql, [this.isbn]);
    }
}


module.exports = BookModel;