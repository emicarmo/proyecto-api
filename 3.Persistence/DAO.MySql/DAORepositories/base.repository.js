const DataBaseServer = require('../db.config');// Importamos la configuracion de la conexion a la base

class BaseRepository{ // Creamos clase general para realizar metodos CRUD
    constructor(tableName){
        this.tableName = tableName;// Nombre de la tabla elegida en base de datos
        this.fields = null;// Inicializamos campos a null
        this.values = null;// Inicializamos valores a null
        this.dataBaseServer = new DataBaseServer(); // Instanciamos de DataBaseServer
    }

    async query(sql, params){//Se agrega aqui bloque try-catch aqui para el manejo de errores ya que todos los metodos usan this.query
        try{
            const [results, ] = await this.dataBaseServer.dbConnection().execute(sql, params);// Consulta SQL generica con los parametros proporcionados
            return results;
        } catch (error){
            console.error(`Error ejecutando query: ${sql}`, error);
            throw error;
        }
    }

    // Metodos de busqueda y filtrado

    async findById(id){
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;// Consulta SQL por id
        return await this.query(sql, [id]);// Retorna la ejecucion de la consulta y resultado
    }

    async findAll(entityFields = null){ // entityFields deberia verse como un objeto {field_1, field_2, field_3, etc..}
        const paramsFields = (!entityFields) ? '*' : Object.keys(entityFields).join(', ');// Define los campos a seleccionar por la consulta

        const sql = `SELECT ${paramsFields} FROM ${this.tableName}`;// Consulta para seleccionar todos los registros de la tabla
        return await this.query(sql);// Retorna la ejecucion de la consulta y resultado
    }


    // Metodos de manipulacion de datos

    async extractData(entityObject){ 
        this.fields = Object.keys(entityObject);
        this.values = Object.values(entityObject);
        /* Este metodo: extractData(entitytObject) extrae, interpreta y transforma los datos entre js y sql. Asigna a this.fields un array con los nombres de campos, por ejemplo (['id', 'nombre', 'apellido',etc]); y, a this.values un array de los valores correspondientes ([1, 'Eduardo', 'ElBonito', etc]). Permitiendo luego formar el par: clave=valor
        Al igual que todos los metodos, al ser asincrono no importa en que orden de lugar este declarado dentro de la clase.
        Prefiero ponerlo aqui y no al final ya que sera usado por los dos proximos metodos: add y update, asi es mas facil su visualizacion y entendimiento */
    }

    async add(entity){// Para agregar un nuevo registro a la tabla
        try{
            this.extractData(entity);// Extrae los datos del objeto entity
                console.log('en base repository: this.extractData', entity);
                console.log('en base repository: ',this.extractData, entity);
                const sql = `INSERT INTO ${this.tableName} (${[...this.fields]}) VALUES (${[...this.values.map(value=> `"${value}"`)]})`;// Determina la tabla, los campos y sus valores                                                            
                console.log('en base repository: Resultado de la consulta:', sql);
                const result = await this.query(sql);// Insertar el nuevo registro
                console.log('en base repository: Mostrar result que se devuelve:', result);
                return result;

        } catch (error) {
                console.error('en base repository: Error al ejecutar la consulta:', error);
                throw error;// Re-lanza el error para que pueda ser capturado por quien lo llama
        }
    }

    async update(entity, id){ // Actualiza un registro existente en la tabla //
        this.extractData(entity); // Extrae los datos en dos array: this.fields y this.values (campo y valor)

        const clouse = this.fields.map(field => `${field}=?`).join(', ');// Tomamos el array de campos: this.fields y map itera en cada elemento (transformandolo en un array clave=valor "${field}=?") y finalmente .join lo transforma en una cadena de texto entendible para sql
        const sql = `UPDATE ${this.tableName} SET ${clouse} WHERE id = ?`;//Se define sql usando update y this.tableName que es libros y usando set para la cadena de texto que es clouse donde id es igual al ingresado en parametros
        return await this.query(sql, [...this.values, id]);// Finalmente se une todo: const sql + operadr ... para expandir array + this.values +id y devuelve la actualizacion
    }

    async delete(id){// Elimina un registro por su ID
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return await this.query(sql, [id]);
    }

}


module.exports = BaseRepository;

