// Importamos el contexto de datos que contiene la configuración de la base de datos
const dataContext = require('../db.config');

// Definimos la clase BaseRepository que contiene las operaciones comunes para todos los repositorios
class BaseRepository {
    constructor(tableName) {
        // Inicializamos el nombre de la tabla y las propiedades fields y values
        this.tableName = tableName;
        this.fields = null;
        this.values = null;
    }

    // Método genérico para ejecutar consultas SQL
    async query(sql, params) {
        // Ejecuta la consulta SQL con los parámetros proporcionados y retorna los resultados
        const [results, ] = await dataContext.execute(sql, params);
        return results;
    }

    // Métodos de búsqueda y filtrado

    // Método para encontrar un registro por su ID
    async findById(id) {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return await this.query(sql, [id]);
    }

    // Método para encontrar todos los registros, con la opción de seleccionar campos específicos
    async findAll(entityFields = null) {
        // entityFields debería ser un objeto {field_1, field_2, field_3, etc..}
        const paramsFields = (!entityFields) ? '*' : Object.keys(entityFields).join(', ');

        const sql = `SELECT ${paramsFields} FROM ${this.tableName}`;
        return await this.query(sql);
    }

    // Métodos de manipulación de datos

    // Método para agregar un nuevo registro
    async add(entity) { // entity es un objeto del tipo entity
        this.extractData(entity);

        const sql = `INSERT INTO ${this.tableName} (${[...this.fields]}) VALUES (${[...this.values.map(value => `"${value}"`)]})`;
        
        return await this.query(sql);
    }

    // Método para actualizar un registro existente
    async update(entity, id) {
        this.extractData(entity);

        const clouse = this.fields.map(field => `${field}=?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id = ?`;
        return await this.query(sql, [...this.values, id]);
    }

    // Método para eliminar un registro por su ID
    async delete(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return await this.query(sql, [id]);
    }

    // Método para extraer las claves y valores de un objeto entidad
    async extractData(entityObject) {
        this.fields = Object.keys(entityObject);
        this.values = Object.values(entityObject);
    }
}

// Exportamos la clase BaseRepository para que pueda ser utilizada en otros archivos
module.exports = BaseRepository;
