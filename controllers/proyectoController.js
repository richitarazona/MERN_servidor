const Proyecto = require('../models/Proyecto.js');
const { validationResult } = require('express-validator');



exports.crearProyecto = async( req, res) => {

     //revisamos si hay erroes
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         //NOS DEVUELVE UN ARRAY DE ERRORES
         return res.status(400).json({errores : errores.array()});
     }

    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardamos el credor via JWT
        proyecto.creador = req.usuario.id;
        //Guardamos proyecto
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
//Obtiene todos los proyectos

exports.obtenerProyectos = async (req, res) => {
    try {
        //Nos trae todos los proyectos en el que el creador sea el usuarioId que le estamos enviando
        const proyectos = await Proyecto.find({ creador: req.usuario.id}).sort({ creado: -1});
        //Enviamos los proyectos
        res.json({ proyectos })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo error al obtener el proyecto');
    }
};

//  Actualiza un proyecto 
exports.actualizarProyecto = async(req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    
    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {

        // revisar el ID 
        
        let proyecto = await Proyecto.findById(req.params.id);

        // si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto}, { new: true });

        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

// Elimina un proyecto por su id
    exports.eliminarProyecto = async (req, res ) => {
    try {
        // revisar el ID 
        let proyecto = await Proyecto.findById(req.params.id);

        // si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar el Proyecto
        await Proyecto.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Proyecto eliminado '});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};