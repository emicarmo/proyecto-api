const express = require('express');
const { Router } = require('express');
const jwt = require('jsonwebtoken'); 

const { UsersController } = require('../controllers/index');
const { generateToken, verifyToken } = require('../middleware/auth.JwToken');


const router = Router();
const usersController = new UsersController();


/* --------------------- Rutas para usuarios ----------------------------- */

router.post('/usuario/register', usersController.createUser.bind(usersController));// Registro de usuario
router.post('/usuario/update',  verifyToken, usersController.updateUser.bind(usersController));// Actualizacion de datos del usuario unicamente propios
router.post('/login', usersController.login.bind(usersController));// Inicio de sesion usuario
router.get('/usuario/perfil', verifyToken, (req, res) => {// El usuario ya esta autenticado y se puede acceder a req.user.email u otros datos según sea necesario
    console.log('Datos del usuario en req.user:', req.user); //Borrar
                res.json({ // Obtenemos datos del usuario registrado para perfil con los mismos nombres que se crearon en controller
                    id_usuario: req.user.id, 
                    usuario: req.user.usuario, 
                    email: req.user.email 
                });
            }
        );

/* --------------------- Rutas para administradores ----------------------------- */

router.get('/admi', verifyToken, usersController.getAll.bind(usersController));// Obtener todos los usuarios
router.get('/admi/:id', verifyToken, usersController.getById.bind(usersController));// Obtener un usuario por ID
router.get('/admi/email/:email', verifyToken, usersController.isEmailRegistered.bind(usersController));// Verificar si un email está registrado // Manejar de otra forma
//router.post('/admi/verifyCredentials', verifyToken, usersController.verifyCredentials.bind(usersController));// Verificar credenciales de un usuario // Manejar de otra forma
router.delete('/admi/:id', verifyToken, usersController.deleteUser.bind(usersController));// Eliminar un usuario por ID


module.exports = router;

