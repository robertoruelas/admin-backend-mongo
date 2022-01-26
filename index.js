require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear el servidor express
const app = express();

// Configurar cors
app.use(cors());

// Lectura y parceo del body
app.use( express.json());

// Base de datos
dbConnection();

//robert
//Sofia261

// Rutas 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {

console.log('Servidor corriendo en puerto.' + 3000);

});
