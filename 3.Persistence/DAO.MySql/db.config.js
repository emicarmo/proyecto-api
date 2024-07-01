// Importamos el módulo mysql2 para interactuar con MySQL
const mysql = require('mysql2');
// Importamos dotenv para cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Creamos un pool de conexiones para manejar las conexiones a la base de datos
const pool = mysql.createPool({
    // Configuración obtenida de las variables de entorno
    host: process.env.DB_HOST,        // Dirección del host de la base de datos
    port: process.env.DB_PORT,        // Puerto de la base de datos
    user: process.env.DB_USER,        // Usuario de la base de datos
    password: process.env.DB_PASS,    // Contraseña del usuario
    database: process.env.DB_NAME,    // Nombre de la base de datos
    waitForConnections: true,         // Esperar conexiones si no hay disponibles inmediatamente
    connectionLimit: 10,              // Límite máximo de conexiones activas
    queueLimit: 0                     // Sin límite en la cola de conexiones en espera
});

// Exportamos el pool de conexiones configurado para que se pueda utilizar en otros archivos
module.exports = pool.promise();
