//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
//Creamos la ocnstatnte para poder validar
const { check } = require('express-validator');

 //Crea un usuario
 // Este es el endPoint => api/usuarios
 router.post('/',
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'Agrega email valido').isEmail(),
                check('password', 'El passsword debe ser minimo de 6 caracteres').isLength({ min:6})

            ],
            usuarioController.crearUsuario
 );
 module.exports = router;