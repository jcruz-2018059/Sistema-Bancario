
const depositController = require('./deposit.controller');
const express = require('express');
const api = express.Router();


api.get('/', depositController.test);
api.post('/add', depositController.add)
api.get('/allDeposits', depositController.allDeposit)
api.post('/reverse', depositController.reverseDeposit)




module.exports = api;