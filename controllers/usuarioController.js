const Usuario = require('../models/Usuario');
//Sirve para hasear(encriptar el password)
const bcryptjs = require('bcryptjs');
//Importamos el resultadi de la validacion
const { validationResult} = require('express-validator');
//Importamos json web token
const jwt = require('jsonwebtoken');



exports.crearUsuario = async ( req, res) => {

    //revisamos si hay erroes
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        //NOS DEVUELVE UN ARRAY DE ERRORES
        return res.status(400).json({errores : errores.array()});
    }

    //Extraemos email y password

    const { email, password} = req.body;


    //Creamos un nuevo usuario
    try {
        //revisa que el usuario sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }
        
        //crea el nuevo usuario
        usuario = new Usuario(req.body);
        //HAsemaos el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guarda el usuario
        await usuario.save();

         // Crear y firmar el JWT
         const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT con la palabra secreta y le damos en el objeto su configuracion
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};
