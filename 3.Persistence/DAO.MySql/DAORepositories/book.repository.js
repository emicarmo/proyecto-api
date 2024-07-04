// Importamos el repositorio base que contiene las operaciones comunes para todos los repositorios
const BaseRepository = require('./base.repository');

// Definimos la clase BookRepository que extiende de BaseRepository
class BookRepository extends BaseRepository {
    constructor(){
        // Llamamos al constructor de la clase base, pasando el nombre de la tabla 'libros'
        super('libros');
    }

    async getAll(){
        const sql = `SELECT libros.*, categoria.nombre_cat as categoria FROM ${this.tableName} LEFT JOIN categoria on categoria.id_categoria = libros.categoria_id`;
        return await this.query(sql);
    }

    async findById(id){
        const sql = `SELECT libros.*, categoria.nombre_cat as categoria FROM ${this.tableName} LEFT JOIN categoria on categoria.id_categoria = libros.categoria_id where libros.id_libros = ${id}`;
        return await this.query(sql);
    }


    async delete(id){
        const sql = `delete from ${this.tableName} where id_libros = ${id}`;
        return await this.query(sql, [id]);
    }

    async update(entity, id){
        this.extractData(entity);

        const clouse = this.fields.map(field => `${field}=?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id_libros = ?`;
        return await this.query(sql, [...this.values, id]);
    }
}

// Exportamos la clase BookRepository para que pueda ser utilizada en otros archivos
module.exports = BookRepository;
