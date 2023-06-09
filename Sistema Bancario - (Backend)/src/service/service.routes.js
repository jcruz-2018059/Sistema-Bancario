

const serviceController = require('./service.controller');
const express = require('express');
const api = express.Router();


api.get('/',serviceController.test);
api.post('/addService', serviceController.addService);








module.exports = api;