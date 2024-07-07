const { UserRepository } = require('../../3.Persistence/DAO.MySql');
const validator = require('../../Utils/validator');// Agregamos para poder validar los datos que ingresaran a las tablas de la base de datos, antes de que se procese el metodo

class UserModel {
    constructor() {
        this.repository = new UserRepository();
    }

    async getAll() {
        return await this.repository.findAll();
    }

    async getById(id) {
        try {
            return await this.repository.searchById(id);
        } catch (error) {
            throw new Error(`en model : Error obteniendo usuario por ID: ${error.message}`);
        }
    }

    async add(userEntity) {
        try {
            console.log('en model: Antes de validar userEntity en UserModel:', userEntity);// BORRAR
            validator.validateUser(userEntity);
            console.log('en model: Después de validar userEntity en UserModel:', userEntity);// BORRAR
            const result = await this.repository.add(userEntity);
            console.log('en user.model : Resultado de la consulta:', result);// BORRAR
            return { result };
            
        } catch (error) {
            console.error('Error en UserModel:', error); // BORRAR
            if (error.isJoi) {
                return { error: `en model: Error de validación: ${error.message}` };// Error de validacion de datos
            }
            return { error: `en model: Error al agregar usuario: ${error.message}` };// Otro tipo de error, por ejemplo, de la base de datos
        }
    }

    async update(userEntity, id) {
        try {
            validator.validateUser(userEntity);
            const result = await this.repository.update(userEntity, id);
            return result;
        } catch (error) {
            if (error.isJoi) {
                return { error: `Error de validación: ${error.message}` };// Error de validacion de datos
            }
            return { error: `Error al modificar usuario: ${error.message}` };// Otro tipo de error, por ejemplo, de la base de datos
        }
    }

    async delete(id) {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async findByEmail(email) {
        try {
            const result = await this.repository.findByEmail(email);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async isEmailRegistered(email) {
        try {
            const result = await this.repository.isEmailRegistered(email);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async verifyCredentials(email, password) {
        try {
            const result = await this.repository.verifyCredentials(email, password);
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

}

module.exports = UserModel;

