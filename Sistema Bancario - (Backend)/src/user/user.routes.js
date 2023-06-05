'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin, isClient } = require('../../services/authenticated');

//Funciones generales
api.get('/', userController.test);
api.post('/login', userController.login);

module.exports = api;