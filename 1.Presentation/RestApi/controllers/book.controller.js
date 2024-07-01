//IMPORTS

// Importamos los objetos request y response de express, para poder tipar correctamente los parámetros en los métodos del controlador, y el modelo de libro desde la capa de dominio
const { request, response } = require('express');
const BookModel = require('../../../2.Domain/Models/index.js');

// Definimos la clase booksController que manejará las operaciones CRUD para los libros
class booksController {
    constructor(){
        // El controlador implementa directamente el modelo de datos
        this.model = new BookModel();
    }

    // Funciones de consulta (Query functions)

    // Método para obtener todos los libros
    async getAll(req = request, res = response){
        const result = await this.model.getAll();
        res.json({
            result
        });
    }

    // Método para obtener un libro por su ID
    async getById(req = request, res = response){
        const id = req.params.id;
        const result = await this.model.getById(id);

        res.json({
            result
        });
    }

    // Funciones de comando (Commands functions)

    // Método para crear un nuevo libro
    async createBook(req = request, res = response){
        const bookEntity = req.body;
        const result = await this.model.add(bookEntity);

        res.json({
            result,
            bookEntity
        });
    }

    // Método para actualizar un libro existente por su ID
    async updateBook(req = request, res = response){
        const id = req.params.id;
        const bookEntity = req.body;
        const result = await this.model.update(bookEntity, id);
        res.json({
            result,
            id,
            bookEntity
        });
    }

    // Método para eliminar un libro por su ID
    async deleteBook(req = request, res = response){
        const id = req.params.id;
        const result = await this.model.delete(id);
        res.json({
            result,
            id
        });
    }
}

// Exportamos la clase booksController para que pueda ser utilizada en otros archivos
module.exports = booksController;
