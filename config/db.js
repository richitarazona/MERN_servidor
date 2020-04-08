const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});


//Conectamos a la BBDD

const conectarDB = async () => {
    try {
        //PAsamos la configuracion y el objeto de configuracion
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology:true,
            useFindAndModify: false
        });
        console.log('BBDD conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

module.exports = conectarDB;