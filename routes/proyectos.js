//Rutas para crear proyectos
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectocontroller');
const auth = require('../middleware/auth');
const { check} = require('express-validator');

// Crea proyectos
// api/proyectos
router.post('/', 
    //Primero verifica si esta autentificado y despues crea proyecto
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);
router.get('/', 
    //Primero verifica si esta autentificado y despues crea proyecto
    auth,
    proyectoController.obtenerProyectos
);

// Actualizar proyecto via ID
router.put('/:id', 
    //lo autentificamos (auth),comprobamos si tiene nombre(check) y lo actualizamos
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);
    // Eliminar un Proyecto
    router.delete('/:id', 
        auth,
        proyectoController.eliminarProyecto
    );



module.exports = router;