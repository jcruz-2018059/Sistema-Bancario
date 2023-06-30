

const serviceController = require('./service.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin}   = require('../../services/authenticated');


api.get('/',serviceController.test);
api.post('/addService',[ ensureAuth, isAdmin ] , serviceController.addService);
api.get('/getServices', [ ensureAuth], serviceController.getServices);
api.delete('/deleteService/:id', [ensureAuth, isAdmin], serviceController.deleteService);
api.put('/updateService/:id', [ensureAuth, isAdmin], serviceController.updateService);
api.get('/getService/:id', [ ensureAuth], serviceController.getService);








module.exports = api;