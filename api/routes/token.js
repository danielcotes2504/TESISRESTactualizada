'use strict'

var express = require('express');
var TokenController = require('../controllers/token');
const router = require('./userLogin');
var api = express.Router();

api.get('/tokenuser/:user', TokenController.getTokenUser);
api.get('/tokenusers', TokenController.getTokenAllUsers);
api.post('/token', TokenController.postToken);

module.exports = api;


