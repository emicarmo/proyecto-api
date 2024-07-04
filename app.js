//IMPORTS
// Importamos los módulos RestApiServer y FrontServer, que contienen las configuraciones y lógica para iniciar los servidores de la API y el frontend.
const RestApiServer = require('./1.Presentation/RestApi/rest.server.js');
const FrontServer = require('./1.Presentation/Frontend/front.server.js');

//FUNCIÓN ASÍNCRONA EJECUTABLE

// Inmediatamente invocamos una función asíncrona que contiene la llamada a la función main.
// Este patrón permite que el código asíncrono se ejecute en el contexto de una IIFE (Immediately Invoked Function Expression).
(async () => {
    await main();
})();

//FUNCIÓN PRINCIPAL

// Definimos la función principal que se encargará de la lógica para iniciar los servidores.
// Esta función es asíncrona para permitir el uso de await.
async function main() {

    // Instanciamos un nuevo objeto de la clase RestApiServer y de la clase FrontServer.
    const restApiServer = new RestApiServer();
    const frontServer = new FrontServer();

    // Iniciamos el servidor de la API REST y del frontend llamando al método start de los objetos.
    restApiServer.start();
    frontServer.start();
}

// const restApiServer = new RestApiServer();
// const frontServer = new FrontServer();

// restApiServer.start();
// frontServer.start();

