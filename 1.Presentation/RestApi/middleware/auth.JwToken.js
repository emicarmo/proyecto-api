// Archivo middleware JW token para autentificar sesion usuarios, se utiliza en controllers y rutas del backend y en archivos del frontend que requieran guardar sesiones

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];// token toma el valor desde la cabecera de la solicitud

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    const secretKey = process.env.JWT_SECRET;// Busca el valor en el archivo .env

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        req.userId = decoded.userId;// Devuelve el id del usuario registrado o logueado para poder utilizar otros metodos con ese usuario
        next();
    });
};


module.exports = verifyToken;


