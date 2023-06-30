'use strict';

const express = require('express');
//Logs de las solicitudes que reciba el servidor
const morgan = require('morgan');
//Seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro origen o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3200;

// Rutas
const userRoutes = require('../src/user/user.routes');
const serviceRoutes = require('../src/service/service.routes');
const favoriteRoutes = require('../src/favorites/favorites.routes');
//Rutas de deposit
const depositRoutes = require('../src/deposit/deposit.routes');
//Rutas de favorites
//Rutas de movement
//Rutas de service

//Configurar el servidor de express
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada colección 
app.use('/user', userRoutes);
//Rutas de colecciónv deposit
app.use('/deposit', depositRoutes);
//Rutas de colección favorites
app.use('/favorite', favoriteRoutes);
//Rutas de colección movement
//Rutas de colección service
app.use('/service',serviceRoutes);

//Función para levantar el puerto
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
};