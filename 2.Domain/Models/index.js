//IMPORTS

// Importamos el repositorio de libros desde la capa de persistencia, en este caso implementado con MySQL
const { BookRepository } = require('../../3.Persistence/DAO.MySql');

// Definimos la clase BookModel que manejará la lógica de negocio para los libros
class BookModel {
    constructor(){
        this.repository = new BookRepository(); // Inicializamos el repositorio de libros
    }

    // TODO: Crear un objeto de respuesta estándar para ser retornado en cada operación.

    // Método para obtener todos los libros
    async getAll(){
        return await this.repository.findAll();
    }

    // Método para obtener un libro por su ID
    async getById(id){
        return await this.repository.findById(id);
    }

    // Método para agregar un nuevo libro
    async add(bookentity){
        // TODO: Validar y sanitizar los datos

        try {
            const result = await this.repository.add(bookentity);
            return { result };
        } catch (error) {
            return { error };
        }
    }

    // Método para actualizar un libro existente por su ID
    async update(bookEntity, id){
        // TODO: Validar y sanitizar los datos

        try {
            const result = await this.repository.update(bookEntity, id);
            return result;
        } catch (error) {
            return error;
        }
    }

    // Método para eliminar un libro por su ID
    async delete(id){
        // TODO: Validar y sanitizar los datos

        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (error) {
            return error;
        }
    }
}

// Exportamos la clase BookModel para que pueda ser utilizada en otros archivos
module.exports = BookModel;
