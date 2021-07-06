'use strict'

var Project = require('../models/project');

/**
 * Método para consultar un proyecto por su ID.
 * @param {*} req 
 * @param {*} res 
 */
function getProjectId(req,res){

    var projectId = req.params._id;

    Project.find({_id : projectId},['name','user'], (err,project) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!project){
                res.status(404).send({ message: "No existe el proyecto"});
            }else if(project.length == 0){
                res.status(200).send({ message: "No existe un proyecto con ese id"});
            }else{
                res.status(200).send({ project });
            }
        }
    })
}

/**
 * Método para consultar los proyectos de un usuario.
 * @param {*} req 
 * @param {*} res 
 */
function getProjectUser(req,res){
    
    var projectUser = req.params.user;

    Project.find({user : projectUser},['_id','name','user'], (err,project) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!project){
                res.status(404).send({ message: "Este usuario no existe"});
            }else if(project.length == 0){
                res.status(200).send({ message: "Este usuario no tiene dispositivos"});
            }else{
                res.status(200).send({ project });
            }
        }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getProjectName(req,res){
    
    var projectName = req.params.name;

    Project.find({name : projectName},['_id','name','user'], (err,project) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!project){
                res.status(404).send({ message: "Este proyecto no existe"});
            }else if(project.length == 0){
                res.status(200).send({ message: "No hay proyectos con ese nombre " + projectName});
            }else{
                res.status(200).send({ project });
            }
        }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function postProject(req, res){
    var project = new Project();
    var params = req.body;

    //deviceid = params.token;

    project.name = params.name;
    project.user = params.user;

    project.save((err, projectStored) => {
        if(err){
            console.log("ERROR: " + err);
            res.status(500).send({ message: 'Error ' + err});
        }else{
            res.status(200).send({ project: projectStored });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function updateProject(req, res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, (err,projectUpdate) => {
        if(err){
            res.status(500).send({ message: 'Error al actualizar'});
        }else{
            
            res.status(200).send({ projectUpdate });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteProject(req,res){

    var projectId = req.params.id;

    Project.findByIdAndRemove({_id : projectId},req.body,(err, project) => {
        if(err){
            res.status(500).send({ message: "Error "});

        }else if(!project){
            res.status(404).send({ message: "No existe"});

        }else if(!err){
            res.status(200).send({ message: "Proyecto eliminado"});
        }
        
        /*else {
            Project.remove((err) => {
                if(err){
                    res.status(500).send({ message: "ERROR AL ELIMINAR"});
                }else{
                    res.status(200).send({ message: "Proyecto eliminado"});

                }
            });
        }*/
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteProjectByUser(req,res){

    var userProject = req.params.user;

    Project.findOneAndRemove({user: userProject},req.body,(err, project) =>{
        if(err){
            res.status(500).send({ message: "Error"});
        }else if(!project){
            res.status(404).send({ message: "No existe"});
        }else if(!err){
            res.status(200).send({ message: "Proyectos eliminados"});
            /*Project.remove((err) =>{
                if(err){
                    res.status(500).send({ message: "Error al eliminar"});
                }else{
                    res.status(200).send({ message: "Proyectos eliminados"});
                }
            });*/  
        }
    });
}

module.exports = {
    getProjectId,
    getProjectUser,
    getProjectName,
    postProject,
    updateProject,
    deleteProject,
    deleteProjectByUser
}