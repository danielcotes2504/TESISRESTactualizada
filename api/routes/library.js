'use strict'

var express = require('express');
var LibraryController = require('../controllers/library');
var api = express.Router();

api.get('/libraries', LibraryController.getLibraries);
api.get('/library/:id',LibraryController.getLibraryId);
api.post('/library', LibraryController.postLibrary);
//api.put('/device/:id',DeviceController.updateDevice);
api.delete('/library/:id',LibraryController.deleteLibrary);


module.exports = api;