'use strict'

var Device = require('../models/device');

/**
 * Metodo para consultar todos los dispositivos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
function getDevices(req, res) {

    Device.find({}, (err, devices) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar' });
        } else {
            if (!devices) {
                res.status(404).send({ message: 'No existen dispositivos' });
            } else {
                res.status(200).send({ devices });
            }
        }

    });

}


/**
 * Método para consultar los dispositivos por id.
 * @param {*} req 
 * @param {*} res 
 */
function getDeviceId(req,res){
    
    var deviceId = req.params.id;

    Device.find({_id : deviceId},['user','name','project','projectId','variables'], (err,device) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!device){
                res.status(404).send({ message: "Este usuario no existe"});
            }else if(device.length == 0){
                res.status(200).send({ message: "Este usuario no tiene dispositivos"});
            }else{
                res.status(200).send({ device });
            }
        }
    })
}

/**
 * Método para consultar los dispositivos de un usuario.
 * @param {*} req 
 * @param {*} res 
 */
function getDeviceUser(req,res){
    
    var deviceUser = req.params.user;

    Device.find({user : deviceUser},['user','name','project','projectId','variables'], (err,device) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!device){
                res.status(404).send({ message: "Este usuario no existe"});
            }else if(device.length == 0){
                res.status(200).send({ message: "Este usuario no tiene dispositivos"});
            }else{
                res.status(200).send({ device });
            }
        }
    })
}

/**
 * Método para obtener todos los dispositivos de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function getDeviceProject(req,res){

    var deviceProject = req.params.projectId;

    Device.find({projectId: deviceProject},['user','name','project','projectId','variables'], (err,device) =>{
        if(err){
            res.status(500).send({message: "Error " + err});
        }else{
            if(!device){
                res.status(404).send({message: "Este usuario no existe"});
            }else if(device.length == 0){
                res.status(200).send({message: "Este proyecto no tiene dispositivos"});
            }else{
                res.status(200).send({device});
            }
        }
    })
}

/**
 * Método para crear un dispositivo.
 * @param {*} req 
 * @param {*} res 
 */
function postDevice(req, res){
    var device = new Device();
    var params = req.body;

    device.name = params.name;
    device.user = params.user;
    device.project = params.project;
    device.projectId = params.projectId;
    device.variables = params.variables;

    device.save((err, deviceStored) => {
        if(err){
            res.status(500).send({ message: 'Error ' + err});
        }else{
            res.status(200).send({ device: deviceStored });
        }
    });
}

/**
 * Método para actualizar los datos de un dispositivo.
 * @param {*} req 
 * @param {*} res 
 */
function updateDevice(req, res){
    var deviceId = req.params.id;
    var update = req.body;

    Device.findByIdAndUpdate(deviceId, update, (err,deviceUpdate) => {
        if(err){
            res.status(500).send({ message: 'Error al actualizar'});
        }else{
            res.status(200).send({ deviceUpdate });
        }
    });
}

/**
 * Método para eliminar los dispositivos de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function deleteDeviceByProject(req,res){

    var project = req.params.projectId;

    Device.findOneAndRemove({projectId : project},(err, device) => {
        if(err){
            res.status(500).send({ message: "Error "});
        }else if(!device){
            res.status(500).send({ message: "No existe"});
        }else if(!err){
            res.status(200).send({ message: "Dispositivos eliminados"});
            /*Device.remove((err) => {
                if(err){
                    res.status(500).send({ message: "ERROR AL ELIMINAR"});
                }else{
                    res.status(200).send({ message: "Dispositivos eliminados"});
                }
            });*/
        }
    });
}

/**
 * Método para eliminar un proyecto por su id.
 * @param {*} req 
 * @param {*} res 
 */
function deleteDeviceById(req,res){

    var deviceId = req.params.id;

    Device.findByIdAndRemove({_id: deviceId},req.body,(err,device)=>{
        if(err){
            res.status(500).send({ message: "Error"});

        }else if(!device){
            res.status(404).send({ message: "No existe"});

        }else if(!err){
            res.status(200).send({ message: "Dispositivo eliminado"});
        }
    });
}

function deleteDeviceByUser(req,res){

    var userDevice = req.params.user;

    Device.findOneAndRemove({user: userDevice}, req.body,(err, device) => {
        if(err){
            res.status(500).send({message: "Error"});
        }else if(!device){
            res.status(404).send({message:"No existe"});
        }else if(!err){
            res.status(200).send({message: "Dispositivos eliminados"});

            /*Device.remove((err)=>{
                if(err){
                    res.status(500).send({message: "Error al eliminar"});
                }else{
                    res.status(200).send({message: "Dispositivos eliminados"});
                }
            });*/
        }
    });
}

module.exports = {
    getDevices,
    getDeviceUser,
    getDeviceId,
    getDeviceProject,
    postDevice,
    updateDevice,
    deleteDeviceById,
    deleteDeviceByProject,
    deleteDeviceByUser
}