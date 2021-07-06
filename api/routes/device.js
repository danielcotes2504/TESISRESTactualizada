'use strict'

var express = require('express');
var DeviceController = require('../controllers/device');
var api = express.Router();

api.get('/devices', DeviceController.getDevices);
api.get('/deviceid/:id',DeviceController.getDeviceId);
api.get('/deviceuser/:user', DeviceController.getDeviceUser);
api.get('/deviceproject/:projectId', DeviceController.getDeviceProject);
api.post('/device', DeviceController.postDevice);
api.put('/device/:id',DeviceController.updateDevice);
api.delete('/device/:id',DeviceController.deleteDeviceById);
api.delete('/device/:projectId',DeviceController.deleteDeviceByProject);
api.delete('/device/:user',DeviceController.deleteDeviceByUser);

module.exports = api;