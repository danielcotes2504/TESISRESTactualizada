'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

api.get('/user/:id', UserController.getUser);
api.get('/users', UserController.getUsers);
api.post('/user', UserController.postUser);
api.put('/user/:id', UserController.updateUser);
api.delete('/user/:login', UserController.deleteUser);

module.exports = api;