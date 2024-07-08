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
            const id = req.user.id_usuarios;
            const result = await this.model.getById(id);

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

            const user = await this.model.verifyCredentials(email, password);
            if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            const token = generateToken({
                id: user.id_usuarios, 
                usuario: user.usuario, 
                email: user.email,
                password: user.password  
            });

            res.json({ success: true, message: 'Inicio de sesión exitoso', token });

        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
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

                validator.validateUser(userEntity);// Validamos los datos

                const result = await this.model.add(userEntity);// Agregamos el usuario utilizando el modelo
    
                    if (!result || !result.result || !result.result.insertId) {// Lanzamos una excepcion error si el usuario no se registra correctamente
                        throw new Error('en copntroller: Error al registrar el usuario');
                    }

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
            const id = req.user?.id || req.user?.id_usuarios;  // Verificación adicional para obtener el id correctamente
            const userEntity = req.body;

            if (!id) {
                throw new Error("ID de usuario no definido");
            }

            const updatedFields = {}; // Filtro campos undefined para no pasar datos null
            for (const key in userEntity) {
                    if (userEntity.hasOwnProperty(key) && userEntity[key] !== undefined) {
                        updatedFields[key] = userEntity[key];
                    }
            }

            const result = await this.model.update(updatedFields, id);

            res.status(200).json({ success: true, result });

        } catch (error) {

                res.status(500).json({ error: `en controller: Error al actualizar usuario: ${error.message}` });
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

