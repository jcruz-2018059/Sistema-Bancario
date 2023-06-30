
const depositController = require('./deposit.controller');
const express = require('express');
const api = express.Router();


api.get('/', depositController.test);









module.exports = api;