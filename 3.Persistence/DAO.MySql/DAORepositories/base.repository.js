const dataContext = require('../db.config');

class BaseRepository{
    constructor(tableName){
        this.tableName = tableName;
        this.fields = null;
        this.values = null;
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

    async findAll(entityFields = null){ // entityFields deberia verse como un objeto {field_1, field_2, field_3, etc..}
        const paramsFields = (!entityFields) ? '*' : Object.keys(entityFields).join(', ');

        const sql = `SELECT ${paramsFields} FROM ${this.tableName}`;
        return await this.query(sql);
    }


    
    // Metodos de manipulacion de datos
    async add(entity){ //book es un objeto del tipo bookEntity
        this.extractData(entity);

        const sql = `INSERT INTO ${this.tableName} (${[...this.fields]}) VALUES (${[...this.values.map(value=> `"${value}"`)]})`;
        
        return await this.query(sql);
    }

    async update(entity, id){
        this.extractData(entity);

        const clouse = this.fields.map(field => `${field}=?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id = ?`;
        return await this.query(sql, [...this.values, id]);
    }

    async delete(id){
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return await this.query(sql, [id]);
    }

    async extractData(entityObject){
        this.fields = Object.keys(entityObject);
        this.values = Object.values(entityObject);
    }

}


module.exports = BaseRepository;