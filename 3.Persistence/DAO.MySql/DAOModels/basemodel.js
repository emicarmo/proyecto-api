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
        const results = await this.query(sql, [id]);
        return results[0];
    }

    async findAll(){
        const sql = `SELECT * FROM ${this.tableName}`;
        return await this.query(sql);
    }
}


module.exports = BaseModel;