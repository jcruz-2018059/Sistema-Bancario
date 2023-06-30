const favoriteController = require('./favorites.controller');
const express =  require('express');
const api = express.Router();
const {ensureAuth} = require('../../services/authenticated');

api.get('/', favoriteController.test);
api.post('/addFavorite', [ensureAuth], favoriteController.addFavorite);
api.get('/getFavorites', [ensureAuth], favoriteController.getFavorites);
api.get('/getFavorite/:id',[ensureAuth], favoriteController.getFavorite);
api.delete('/deleteFavorite/:id', [ensureAuth], favoriteController.deleteFavorite);
api.put('/updateFavorite/:id', [ensureAuth], favoriteController.updateFavorite);




module.exports = api;
