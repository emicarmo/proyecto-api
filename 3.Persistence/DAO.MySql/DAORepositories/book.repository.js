const BaseRepository = require('./base.repository');

class BookRepository extends BaseRepository {
    constructor(){
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


module.exports = BookRepository;