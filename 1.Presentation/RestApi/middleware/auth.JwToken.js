// Archivo middleware JW token para autentificar sesion usuarios, se utiliza en controllers y rutas del backend y en archivos del frontend que requieran guardar sesiones

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generar token con datos específicos
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1]; // Obtener el token sin el prefijo "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Asigna todo el objeto decodificado a req.user
        console.log('Decoded token:', decoded); // Para depuración
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    generateToken,
    verifyToken
};

