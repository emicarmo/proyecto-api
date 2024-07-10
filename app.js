const RestApiServer = require('./1.Presentation/RestApi/rest.server');//Importamos clases que luego se instanciaran
const DataBaseServer = require('./3.Persistence/DAO.MySql/db.config');//Importamos una clase y la nombramos dbServer


(async()=>{
    await main();
})();

//entry point function
async function main(){
    const restApiServer = new RestApiServer();//Instanciamos clase

    const dbServer = new DataBaseServer();// Instanciamos esta clase que llama entre otros a .dbconnection ya inicializados
        console.log(`Database connection pool for ${dbServer.dbName()} is ready to use on port: ${dbServer.dbPort()}`);// La instancia de conexion de dbServer ya está configurada y lista

    restApiServer.start();//Inicializamos clase


}

