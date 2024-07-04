// Importamos el módulo mysql2 para interactuar con MySQL
const mysql = require('mysql2');
// Importamos dotenv para cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Creamos un pool de conexiones para manejar las conexiones a la base de datos
const pool = mysql.createPool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    //password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

// Exportamos el pool de conexiones configurado para que se pueda utilizar en otros archivos
module.exports = pool.promise();
