'use strict'

var Acls = require('../models/acls');

/**
 * Función para obtener la informción de los permisos por su id.
 * @param {Request} req 
 * @param {Response} res 
 */
function getAcls(req, res) {
    var aclsId = req.params.id;

    Acls.findById(aclsId, (err, acls) => {
        if (err) {
            res.status(500).send({ message: "Error" });
        } else {
            if (!user) {
                res.status(404).send({ message: 'No existen acls' });
            } else {
                res.status(200).send({ acls });
            }
        }

    })

}

/**
 * Función para obtener todos los permisos.
 * @param {Request} req 
 * @param {Response} res 
 */
function getAclss(req, res) {

    Acls.find({}, (err, aclss) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar' });
        } else {
            if (!aclss) {
                res.status(404).send({ message: 'No existen acls' });
            } else {
                res.status(200).send({ aclss });
            }
        }

    });

}

/**
 * Función para crear un permiso.
 * @param {*} req 
 * @param {*} res 
 */
function postAcls(req, res) {
    var acls = new Acls();
    var params = req.body;

    
    acls.user = params.user;
    acls.topic = params.topic;
    acls.permission = params.permission;

    acls.save((err, aclsStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar' });
        } else {
            res.status(200).send({ user: aclsStored });
        }

    });
}

/**
 * Función para actualizar un permiso.
 * @param {*} req 
 * @param {*} res 
 */
function updateAcls(req, res) {
    var aclsId = req.params.id;
    var update = req.body;

    Acls.findByIdAndUpdate(aclsId, update, (err, aclsUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ aclsUpdate });
        }
    });
}

/**
 * Función para eliminar un permiso.
 * @param {*} req 
 * @param {*} res 
 */
function deleteAcls(req, res) {
    var aclsId = req.params.id;

    Acls.findById(aclsId, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error" });
        }

        if (!acls) {
            res.status(404).send({ message: 'No existen acls' });
        } else {
            acls.remove((err) => {
                if (err) {
                    res.status(500).send({ message: "Error al borrar" });
                } else {
                    res.status(200).send({ message: "acls eliminado" });
                }
            });
        }
    });
}

module.exports = {
    getAcls,
    getAclss,
    postAcls,
    updateAcls,
    deleteAcls
}