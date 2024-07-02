- Actualizo: domingo 30 de junio 2024 - 16:00
Creo archivo front.static.routes.js para atender la solicitudes GET del frontend y servir las paginas estaticas y la onfiguracion de las vasiables de entorno en GET/config
Se modifican los archivos front.server.js y rest.server.js para corregir las rutas usuarios
Se corrigen los archivos base.repository.js y user.repository.js para que el registro de nuevos usuarios se limite a pedir 3 campos: usuario, email y contraseña
Se modifica validator.js por el mismo motivo
Se cambvia createUser en controllers en user.controller para adaptarlo a los nuevos requerimientos, se deja comentado el codigo anterior

- Actualizo: jueves 27 de junio 2024 - 21:30
Creo archivo validator.js para validar el formato de los datos en carpeta Utils en raiz. 
Creo los archivos user. model, controllers y routes (este en proseso, aun no definido)
Agrego archivos index.js donde hizo falta

- Actualizo: martes 25 de junio 2024 - 23:15
Se incluyen comentarios al margen para recordar lo aprendido
Creo archivo user.repository.js

- Actualizo: martes 25 de junio 2024 - 08:00 hs.
a.- front.server.js y rest.server.js para que utilizen variables de entorno
b.- db.config.js para que utilize variables de entorno, cambio de funcion a clases para seguir la coherencia de los otros archivos, agrego validacion 
para que se asegure que la base existe y sino que la cree, actualizo el pool de conexion para pasarlo a app.js
c.- app.js para que coordine con los cambios realizados

d.- controlar al crear archivo .env en su local que tenga estos nombres:
# Variables DataBase (en mi local) para usar en su local y realizar pruebas
    DB_HOST=
    DB_PORT=
    DB_USER=     
    DB_PASSWORD=
    DB_NAME= 

# Variables DataBase (en servidor database) para usar en presentacion sin errores
    #DB_HOST=
    #DB_PORT=
    #DB_USER=   
    #DB_PASSWORD=
    #DB_NAME=

# Variables Servidor (server backend)
RESTAPI_PORT=

# Variables Cliente (server frontend)
FRONTEND_PORT= 
FRONTEND_PATH=
# FRONTEND_PATH=https://emicarmo.github.io/ProyectoCaC/  # Dirección de ProyectoCaC en la web - para usar en presentacion sin errores

Probado en local y funcionando:
PS "mi local"\Proyectos\proyecto-api> nodemon app.js                                                                                                 
[nodemon] 3.1.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node app.js`
Base path: "mi local"\Proyectos\ProyectoCaC
Database connection pool for DB is ready to use on port: correspondiente
Rest Api server initiated on  port: correspondiente
Front server initiated on  port: correspondiente
dbconfig say: Database DB is ready.
DB database has been created or already exists
