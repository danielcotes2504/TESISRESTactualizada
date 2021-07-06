'use strict'

var express = require('express');
var TableController = require('../controllers/table');
var api = express.Router();

api.get('/tableproject/:project',TableController.getTableProject);
api.post('/table', TableController.postTable);
api.delete('/table/:project',TableController.deleteTableByProject);
api.delete('/tableById/:id',TableController.deleteTableById);

module.exports = api;