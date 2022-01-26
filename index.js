require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear el servidor express
const app = express();

// Configurar cors
app.use(cors());


// Base de datos
dbConnection();

//robert
//Sofia261

// Rutas 
app.get('/',(req, res) => {

res.json({
    ok: true,
    msg: 'hola mundo'
});

});

app.listen(process.env.PORT, () => {

console.log('Servidor corriendo en puerto.' + 3000);

});
