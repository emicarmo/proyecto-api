const { request, response } = require('express');
const jwt = require('jsonwebtoken'); 

const { UserModel } = require('../../../2.Domain/Models/index');
const validator = require('../../../Utils/validator');
const { generateToken, verifyToken }  = require('../middleware/auth.JwToken');

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
            const id = req.user.id;
            console.log('controller 1 ;ID del usuario desde el token:', id); // borrar 
            const result = await this.model.getById(id);
            console.log('controller 2 : Resultado de búsqueda por ID:', result); // borrar 
            if (!result) {
                return res.status(404).json({ message: ' en controller Usuario no encontrado' });
            }
    
            res.json({ result });

        } catch (error) {
            if (!res.headersSent) { // Verifica si los encabezados ya fueron enviados
                res.status(500).json({ error: error.message });
            } else {
                console.error('controller 5 . Error después de enviar la respuesta:', error);
            }
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

    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await this.model.verifyCredentials(email, password);// Verifica credenciales del usuario desde model
            if (!user) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }
    
            const token = jwt.sign({// Genera token
                id_usuario: user.id, 
                usuario: user.usuario, 
                email: user.email  
                },

                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
    
            res.json({ success: true, message: 'Inicio de sesión exitoso', token });// Devuelve el token como respuesta
        } catch (error) {
            res.status(500).json({ success: false, message: 'en controller: Error al iniciar sesión', error: error.message });
        }
    }

    // Commands functions

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

