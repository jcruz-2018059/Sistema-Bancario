'use strict';

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin} = require('../../services/authenticated');
const { save, saveValidation } = require('../../utils/validate');

//Funciones generales
api.get('/', userController.test);
api.post('/login', userController.login);

//Funciones de ADMIN
api.post('/add', [ensureAuth, isAdmin, save, saveValidation], userController.add);
api.get('/get', [ensureAuth, isAdmin], userController.get);
api.put('/update/:id', [ensureAuth, isAdmin, save, saveValidation], userController.update);
api.delete('/delete/:id', [ensureAuth, isAdmin], userController.delete);

module.exports = api;