'use strict'

var express = require('express');
var AclsController = require('../controllers/acls');
var api = express.Router();

api.get('/acls/:id', AclsController.getAcls);
api.get('/aclss', AclsController.getAclss);
api.post('/acls', AclsController.postAcls);
api.put('/acls/:id', AclsController.updateAcls);
api.delete('/acls/:id', AclsController.deleteAcls);

module.exports = api;