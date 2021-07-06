const express = require('express');
const router = express.Router();

const variableController = require('../controllers/variables');

// router.get('/', variableController.getVariables);
router.get('/:user', variableController.getVariablesU);
router.get('/:user/:project', variableController.getVariablesUP);
router.get('/:user/:project/:deviceN', variableController.getVariablesUPD);
router.get('/:user/:project/:deviceN/:variableN', variableController.getVariable);
router.post('/:user/:project/:deviceN/:deviceH', variableController.postVariable);
router.put('/:user/:project/:deviceN/:variableN', variableController.putVariable);
router.delete('/:user/:project/:deviceN/:deviceH/:variableN/:variableT', variableController.deleteVariable);

module.exports = router;