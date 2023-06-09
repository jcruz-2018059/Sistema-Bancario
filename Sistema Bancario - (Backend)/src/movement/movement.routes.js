'use strict';

const express = require('express');
const api = express.Router();
const movementController = require('./movement.controller');
const { ensureAuth, isAdmin, isClient} = require('../../services/authenticated');
const { save, saveValidation } = require('../../utils/validate');

//Funciones generales
api.get('/', movementController.test);

module.exports = api;