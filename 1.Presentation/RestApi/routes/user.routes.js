const { Router } = require('express');
const { UsersController } = require('../controllers/index');
const verifyToken = require('../middleware/auth.JwToken');


const router = Router();
const usersController = new UsersController();


/* --------------------- Rutas para usuarios ----------------------------- */

router.post('/usuario/register', usersController.createUser.bind(usersController));// Registro de usuario
router.post('/usuario/update', usersController.updateUser.bind(usersController));// Actualizacion de datos del usuario unicamente propios
router.post('/usuario/login', usersController.verifyCredentials.bind(usersController));// Inicio de sesion usuario

/* --------------------- Rutas para administradores ----------------------------- */

router.get('/admi', verifyToken, usersController.getAll.bind(usersController));// Obtener todos los usuarios
router.get('/admi/:id', verifyToken, usersController.getById.bind(usersController));// Obtener un usuario por ID
router.get('/admi/email/:email', verifyToken, usersController.isEmailRegistered.bind(usersController));// Verificar si un email está registrado // Manejar de otra forma
router.post('/admi/verifyCredentials', verifyToken, usersController.verifyCredentials.bind(usersController));// Verificar credenciales de un usuario // Manejar de otra forma
router.delete('/admi/:id', verifyToken, usersController.deleteUser.bind(usersController));// Eliminar un usuario por ID


module.exports = router;

