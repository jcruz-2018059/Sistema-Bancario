
const depositController = require('./deposit.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth} = require('../../services/authenticated');

api.get('/', depositController.test);
api.post('/add', ensureAuth, depositController.add);
api.get('/allDeposits', ensureAuth, depositController.allDeposit);
api.post('/reverse', ensureAuth, depositController.reverseDeposit);
api.get('/get', ensureAuth, depositController.getUserDeposits);




module.exports = api;