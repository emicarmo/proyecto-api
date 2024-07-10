const { BookRepository } = require('../../3.Persistence/DAO.MySql');


class BookModel {
    constructor(){
        this.repository = new BookRepository();
    }
    //TODO: Create a standard response object to be returned.

    async getAll(){
        return await this.repository.getAll();
    }

    async getById(id){
        return await this.repository.findById(id);
    }

    async add(nombre, categoria_id, editorial, precio, stock, descripcion, imagen){
        //TODO: Validation data and sanitizacion

        try{
            const result = await this.repository.add(nombre, categoria_id, editorial, precio, stock, descripcion, imagen);
            return { result };
        }catch(error){
            return { error };
        }
    }

    async update(bookEntity, id){
        //TODO: Validation data and sanitizacion
        
        try{
            const result = await this.repository.update(bookEntity, id);
            return result;
        }catch(error){
            return error;
        }
    }
    
    async delete(id){
        //TODO: Validation data and sanitizacion

        try{
            const result = await this.repository.delete(id);
            return result;
        }catch(error){
            return error
        }
    }
    
}


module.exports = BookModel;

