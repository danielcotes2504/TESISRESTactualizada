'use strict'

var express = require('express');
var ChartController = require('../controllers/chart');
var api = express.Router();

api.get('/chartproject/:project',ChartController.getChartProject);
//api.get('/deviceuser/:user', ChartController.getDashboardUser);
api.post('/chart', ChartController.postChart);
//api.put('device/:id',ChartController.updateDashboard);
api.delete('/chart/:project',ChartController.deleteChartByProject);
api.delete('/chartById/:id',ChartController.deleteChartById);

module.exports = api;