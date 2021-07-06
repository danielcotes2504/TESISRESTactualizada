'use strict'

var express = require('express');
var MessageController = require('../controllers/message');
var api = express.Router();

api.get('/message/:id', MessageController.getMessage);
api.get('/messages', MessageController.getMessages);
api.post('/message', MessageController.postMessage);
api.put('/message/:id', MessageController.updateMessage);
api.delete('/message/:id', MessageController.deleteMessage);

module.exports = api;