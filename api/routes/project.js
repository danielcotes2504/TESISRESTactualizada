'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var api = express.Router();

api.get('/projectId/:_id',ProjectController.getProjectId);
api.get('/projectUser/:user', ProjectController.getProjectUser);
api.get('/projectName/:name', ProjectController.getProjectName);
api.post('/project', ProjectController.postProject);
api.put('/project/:id',ProjectController.updateProject);
api.delete('/project/:id',ProjectController.deleteProject);
api.delete('/project/:user',ProjectController.deleteProjectByUser);

module.exports = api;