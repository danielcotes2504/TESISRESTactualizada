const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projects');

//router.get('/', projectController.getProjects);
router.get('/:user', projectController.getProjectsU);
router.get('/:user/:project', projectController.getProject);
router.post('/:user', projectController.postProject);
router.put('/:user/:project', projectController.putProject);
router.delete('/:user/:project', projectController.deleteProject);

module.exports = router;