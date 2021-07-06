'use strict'

var express = require('express');
var DashboardController = require('../controllers/dashboard');
var api = express.Router();

api.get('/dashboardid/:id',DashboardController.getDashboardId);
api.get('/dashboarduser/:user', DashboardController.getDashboardUser);
api.get('/dashboardproject/:project', DashboardController.getDashboardProject);
api.post('/dashboard', DashboardController.postDashboard);
api.put('dashboard/:id',DashboardController.updateDashboard);
api.delete('/dashboard/:project',DashboardController.deleteDashboard);

module.exports = api;