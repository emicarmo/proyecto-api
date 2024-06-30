const { Router } = require('express');
const UsersController = require('../controllers/user.controller');
const { authMiddleware, adminMiddleware } = require('Utils - Middleware - Auth, otros, ver donde?');// Ver donde poner para despues crear e importar

const router = Router();
const usersController = new UsersController();

/* --------------------- Ruta para enviar configuracion al front ----------------------------- */
router.get('/config', (req, res) => {
    res.json({
        backendUrl: process.env.BACKEND_URL // Variable de entorno del backend para ser enviada
    });
});

/* --------------------- Rutas para usuarios ----------------------------- */

router.post('/usuario/register', usersController.createUser.bind(usersController));// Registro de usuario
router.post('/usuario/update', authMiddleware, usersController.updateUser.bind(usersController));// Actualizacion de datos del usuario unicamente propios
router.post('/usuario/login', usersController.verifyCredentials.bind(usersController));// Inicio de sesion usuario

/* --------------------- Rutas para administradores ----------------------------- */

router.get('/admi', adminMiddleware, usersController.getAll.bind(usersController));// Obtener todos los usuarios
router.get('/admi/:id', adminMiddleware, usersController.getById.bind(usersController));// Obtener un usuario por ID
router.get('/admi/email/:email', adminMiddleware, usersController.isEmailRegistered.bind(usersController));// Verificar si un email está registrado // Manejar de otra forma
router.post('/admi/verifyCredentials', adminMiddleware, usersController.verifyCredentials.bind(usersController));// Verificar credenciales de un usuario // Manejar de otra forma
router.delete('/admi/:id', adminMiddleware, usersController.deleteUser.bind(usersController));// Eliminar un usuario por ID


module.exports = router;

