const dataContext = require('../db.config');

class BaseRepository{
    constructor(tableName){
        this.tableName = tableName;
    }

    async query(sql, params){
        const [results, ] = await dataContext.execute(sql, params);
        return results;
    }

    //Metodos de busqueda y filtrado
    async findById(id){
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return await this.query(sql, [id]);
    }

    async findAll(fields = null){
        const sql = `SELECT ${(!fields)?'*':fields.join(', ')} FROM ${this.tableName}`;
        return await this.query(sql);
    }


    
    // Metodos de manipulacion de datos
    async add(fields, values){
        const sql = `INSERT INTO ${this.tableName} (${[...fields]}) VALUES (${[...values]})`;
        return await this.query(sql);
    }

    async update(fields, values, id){
        const clouse = fields.map(field => `${field}=?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id = ?`;
        return await this.query(sql, [...values, id]);
    }

    async delete(id){
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return await this.query(sql, [id]);
    }
}


module.exports = BaseRepository;