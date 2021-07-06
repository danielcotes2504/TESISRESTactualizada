const express = require('express');
const router = express.Router();

const valueController = require('../controllers/values');

// router.get('/', valueController.getValues);
// router.get('/:user', valueController.getValuesU);
// router.get('/:user/:project', valueController.getValuesUP);
// router.get('/:user/:project/:deviceN/:deviceH', valueController.getValuesUPD);
router.get('/:user/:project/:deviceN/:variableN/', valueController.getValue);
router.get('/:user/:project/:deviceN/:deviceH/:variableN/:variableT', valueController.getValuesUPDV);
router.post('/:user/:project/:deviceN/:deviceH/:variableN/:variableT/:variableInd/:constant/:operation/:positive/:negative', valueController.postValueI);
router.delete('/:user/:project/:deviceN/:deviceH/:variableN/:variableT', valueController.deleteValues);

module.exports = router;