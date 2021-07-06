const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/devices');

/* router.get('/', deviceController.getDevices);
router.get('/:user', deviceController.getDevicesU); */
router.get('/:user/:project', deviceController.getDevicesUP);
router.get('/:user/:project/:deviceN/:deviceH', deviceController.getDevice);
router.post('/:user/:project', deviceController.postDevice);
router.put('/:user/:project/:deviceN/:deviceH', deviceController.putDevice);
router.delete('/:user/:project/:deviceN/:deviceH', deviceController.deleteDevice);

module.exports = router;