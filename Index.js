// Importamos express
const express = require('express');
const conectarDB = require('./config/db');

//Creamos el servidor
const app = express();
//cConectamos a la BBDD
conectarDB();

//Habilitamos express.json
app.use( express.json({ extended : true}));



//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importamos las rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));


// arrancamos la app
app.listen(PORT, () => {
    console.log(`Èl servidor esta corriendo en el puerto ${PORT}`);
});