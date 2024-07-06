const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository { //Se crea una clase para user que extiende de BaseRepository
    constructor(){
        super('usuarios'); // Al inicializar BaseRepository con el nombre de la tabla usuarios, todas las operaciones definidas en BaseRepository se aplican a la tabla
    }

    /* -------------------------- Metodos específicos para UserRepository ------------------ */
    // Para buscar por email
    async findByEmail(email) {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;
        return await this.query(sql, [email]);
    }

    // Para verificar si un email ya esta registrado. Sirve de filtro al devolver true o false
    async isEmailRegistered(email) {
        const user = await this.findByEmail(email);
        return user.length > 0; // Devuelve true si el email esta registrado
    }

    // Para verificar las credenciales del usuario. Sirve de filtro al devolver true o false
    async verifyCredentials(email, password) {
        const sql = `SELECT * FROM ${this.tableName} WHERE email = ? AND password = ?`;
        const users = await this.query(sql, [email, password]);
        return users.length > 0; // Devuelve true si las credenciales son correctas
    }

}


module.exports = UserRepository;
