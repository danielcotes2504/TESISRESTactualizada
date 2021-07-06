'use strict'

var Dashboard = require('../models/dashboard');

/**
 * Método para obtener un dashboard por su id.
 * @param {*} req 
 * @param {*} res 
 */
function getDashboardId(req,res){

    var dashboardId = req.params.id;

    Dashboard.finde({id : dashboardId},['project','user'], (err,dashboard) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!dashboard){
                res.status(404).send({ message: "No existe el dashboard"});
            }else if(dashboard.length == 0){
                res.status(200).send({ message: "No existe un dashboard con ese id"});
            }else{
                res.status(200).send({ dashboard });
            }
        }
    })
}

/**
 * Método para consultar los dashboard de un usuario.
 * @param {*} req 
 * @param {*} res 
 */
function getDashboardUser(req,res){
    
    var dashboardUser = req.params.user;

    Dashboard.find({user : dashboardUser},['project','user'], (err,dashboard) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!dashboard){
                res.status(404).send({ message: "Este usuario no existe"});
            }else if(dashboard.length == 0){
                res.status(200).send({ message: "Este usuario no tiene dashboard"});
            }else{
                res.status(200).send({ dashboard });
            }
        }
    })
}

/**
 * Método para consultar los dashboard de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function getDashboardProject(req,res){
    
    var dashboardProject = req.params.project;

    Dashboard.find({user : dashboardProject},['project','user'], (err,dashboard) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!dashboard){
                res.status(404).send({ message: "Este proyecto no existe"});

            }else if(dashboard.length == 0){
                res.status(200).send({ message: "Este proyecto no tiene dashboard"});

            }else{
                res.status(200).send({ dashboard });
            }
        }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function postDashboard(req, res){
    var dashboard = new Dashboard();
    var params = req.body;

    dashboard.project = params.project;
    dashboard.user = params.user;
    
    dashboard.save((err, dashboardStored) => {
        if(err){
            res.status(500).send({ message: 'Error ' + err});
        }else{
            res.status(200).send({ device: dashboardStored });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function updateDashboard(req, res){
    var dashboardId = req.params.id;
    var update = req.body;

    Dashboard.findByIdAndUpdate(dashboardId, update, (err,dashboardUpdate) => {
        if(err){
            res.status(500).send({ message: 'Error al actualizar'});
        }else{
            res.status(200).send({ dashboardUpdate });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteDashboard(req,res){

    var dashboardId = req.params.id;

    Dashboard.find({project : dashboardId},(err, dashboard) => {
        if(err){
            res.status(500).send({ message: "Error "});
        }

        if(!dashboard){
            res.status(500).send({ message: "No existe"});
        }else{
            Dashboard.remove((err) => {
                if(err){
                    res.status(500).send({ message: "ERROR AL ELIMINAR"});
                }else{
                    res.status(200).send({ message: "Dashboard eliminado"});
                }
            });
        }
    });
}

module.exports = {
    getDashboardUser,
    getDashboardId,
    getDashboardProject,
    postDashboard,
    updateDashboard,
    deleteDashboard
}