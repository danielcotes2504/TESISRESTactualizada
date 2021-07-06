'use strict'

var express = require('express');
var TokenController = require('../controllers/token');
var api = express.Router();

api.get('/tokenuser/:user', TokenController.getTokenUser);
api.post('/token', TokenController.postToken);

module.exports = api;