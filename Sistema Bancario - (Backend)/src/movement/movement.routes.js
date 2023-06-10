'use strict';

const express = require('express');
const api = express.Router();
const movementController = require('./movement.controller');
const { ensureAuth, isClient} = require('../../services/authenticated');

//Funciones generales
api.get('/', movementController.test);

//Funciones de Client
api.post('/buy/:service', [ensureAuth, isClient], movementController.buy);
api.post('/transfer', [ensureAuth, isClient], movementController.transfer);

module.exports = api;