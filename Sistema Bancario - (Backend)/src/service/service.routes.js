

const serviceController = require('./service.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth}   = require('../../services/authenticated');


api.get('/',serviceController.test);
api.post('/addService',[ ensureAuth ] , serviceController.addService);
api.get('/getServices', [ ensureAuth ], serviceController.getServices);
api.delete('/deleteService/:id', [ensureAuth], serviceController.deleteService);








module.exports = api;