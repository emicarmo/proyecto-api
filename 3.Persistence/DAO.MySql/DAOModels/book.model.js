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

    async findById(){
        return super.findById(this.id);
    }

    // TODO: Mejorar esto!
    async update(){
        const fields = [];
        const values = [];
        for(const key in this){
            if(key !== 'id' && this[key] !== null && key !== 'tableName'){
                fields.push(key);
                values.push(this[key]);
            }
        }
        return await super.update(fields, values, this.id)
    }
}


module.exports = BookModel;