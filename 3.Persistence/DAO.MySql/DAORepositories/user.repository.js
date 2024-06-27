const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository { //Se crea una clase para user que extiende de BaseRepository
    constructor(){
        super('usuarios'); // Al inicializar BaseRepository con el nombre de la tabla usuarios, todas las operaciones definidas en BaseRepository se aplican a la tabla
    }

        // Métodos específicos para UserRepository
        async findByEmail(email) {
            const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;
            return await this.query(sql, [email]);
        }

}


module.exports = UserRepository;

