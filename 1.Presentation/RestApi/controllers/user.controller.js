const { request, response } = require('express');
const { UserModel } = require('../../../2.Domain/Models/index');
const validator = require('../../../Utils/validator');

class UsersController {
    constructor() {
        this.model = new UserModel();
    }

    // Query functions
    async getAll(req = request, res = response) {
        try {
            const result = await this.model.getAll();
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req = request, res = response) {
        try {
            const id = req.params.id;
            const result = await this.model.getById(id);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByEmail(req = request, res = response) {
        try {
            const email = req.params.email;
            const result = await this.model.findByEmail(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async isEmailRegistered(req = request, res = response) {
        try {
            const email = req.params.email;
            const result = await this.model.isEmailRegistered(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyCredentials(req = request, res = response) {
        try {
            const { email, password } = req.body;
            const result = await this.model.verifyCredentials(email, password);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Commands functions
    /* Comento para poner una mas especifica para buscar error de regfistro por campos requeridos
    async createUser(req = request, res = response) {
        try {
            const userEntity = req.body;
            validator.validateUser(userEntity);
            const result = await this.model.add(userEntity);
            res.json({ result, userEntity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    */

    async createUser(req = request, res = response) {
        try {
            const { usuario, email, password } = req.body;// Extraigo solo los campos necesarios del body
                if (!usuario || !email || !password) {// Valido que los campos requeridos esten
                    return res.status(400).json({ error: 'Debe proporcionar nombre de usuario, email y contraseña' });
               }

                const userEntity = {// Creamos un objeto con estos datos
                    usuario,
                    email,
                    password
                };
                console.log('userEntity:', userEntity);// BORRAR
                validator.validateUser(userEntity);// Validamos los datos
                console.log('Después de validar userEntity en controller luego de crearla y validarla');// BORRAR
                const result = await this.model.add(userEntity);// Agregamos el usuario utilizando el modelo
                console.log('en controller: Resultado de la inserción:', result);//BORRAR
                console.log('en controller: Resultado de la inserción:', result.result);//BORRAR
                console.log('en controller devolucion de result.result.insertId:', result.result.insertId);// BORRAR     
                    if (!result || !result.result || !result.result.insertId) {// Lanzamos una excepcion error si el usuario no se registra correctamente
                        throw new Error('en copntroller: Error al registrar el usuario');
                    }
                console.log('en controller 2 throw: Resultado de la inserción:', result);//BORRAR
                console.log('en controller 2 throw: Resultado de la inserción:', result.result);//BORRAR
                console.log('en controller 2 throw: devolucion de result.result.insertId:', result.result.insertId);// BORRAR   
                   

                    res.json({ success: true, message: 'Usuario registrado exitosamente', result, userEntity });// Enviamos la respuesta de exito
            

            } catch (error) {// Atrapamos errores y los personalizamos segun el caso
                    let errorMessage;
            
                    if (error.message.includes('validation')) {
                        errorMessage = 'en controller: Error de validación de datos del usuario';

                    } else if (error.message.includes('database')) {
                        errorMessage = 'en controller: Error de base de datos al registrar el usuario';

                    } else {
                        errorMessage = 'en controller: Error al registrar el nuevo usuario';
                    }
            
                    res.status(500).json({ success: false, message: errorMessage, error: error.message});// Enviamos una respuesta de error personalizada
                }
    }

    async updateUser(req = request, res = response) {
        try {
            const id = req.params.id;
            const userEntity = req.body;
            validator.validateUser(userEntity);
            const result = await this.model.update(userEntity, id);
            res.json({ result, id, userEntity });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req = request, res = response) {
        try {
            const id = req.params.id;
            const result = await this.model.delete(id);
            res.json({ result, id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}


module.exports = UsersController;

