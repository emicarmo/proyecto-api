const dataContext = require('../db.config');

class BaseModel{
    constructor(tableName){
        this.tableName = tableName;
    }

    async query(sql, params){
        const [results, ] = await dataContext.execute(sql, params);
        return results;
    }

    async findById(id){
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return await this.query(sql, [id]);
    }

    async findAll(){
        const sql = `SELECT * FROM ${this.tableName}`;
        return await this.query(sql);
    }

    async update(fields, values, id){
        const clouse = fields.map(field => `${field}=?`). join(', ');
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id = ?`;
        return await this.query(sql, [...values, id]);
    }
}


module.exports = BaseModel;