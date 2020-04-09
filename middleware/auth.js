const jwt = require('jsonwebtoken');

module.exports = function(req, res,next){
    // Lerr token del header
    const token = req.header('x-auth-token');
    console.log(token);
    //Revisamos si  no hay token

    if(!token){
        return res.status(401).json({msg:'No hay Token, permiso no valido'});
    }

    //Validar Token
    try {
        //verificamos el tokem y le enviamos la palabra secreta
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        // Nos vamos al siguiente middleware
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido'});
        
    }
};