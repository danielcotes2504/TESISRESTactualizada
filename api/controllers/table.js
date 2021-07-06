'use strict'

var Table = require('../models/table');

/**
 * Método para consultar llas tablas de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function getTableProject(req,res){
    var tableProject = req.params.project;

    Table.find({project: tableProject}, ['datas','dates','project','user','title'],(err,table)=>{
        if(err){
            res.status(500).send({message: "Error " + err});
        }else{
            if(!table){
                res.status(404).send({message: "Esta tabla no existe"});
            }else if(table.length == 0){
                res.status(200).send({message: "Este proyecto no tiene tablas."});
            }else{
                res.status(200).send({table});
            }
        }
    });

}

/**
 * Método para crear el documento de una tabla.
 * @param {*} req 
 * @param {*} res 
 */
function postTable(req,res){
    var table = new Table();
    var params = req.body;

    table.project = params.project;
    table.user = params.user;
    table.datas = params.datas;
    table.dates = params.dates;
    table.title = params.title;

    table.save((err, tableStored)=>{
        if(err){
            res.status(404).send({message: "Error " + err});
        }else{
            res.status(200).send({table: tableStored});
        }
    });
}

function deleteTableByProject(req,res){
    var project = req.params.project;

    Table.find({project: project},req.body,(err,table)=>{
        if(err){
            res.status(500).send({message:"Error"});
        }else if(!table){
            res.status(404).send({message: "No existe"});
        }else{
            Table.remove((err)=>{
                if(err){
                    res.status(500).send({message: "Error al eliminar."});
                }else{
                    res.status(200).send({message: "Tabla eliminada."})
                }
            });
        }
    });
}

function deleteTableById(req,res){
    var tableId = req.params.id;

    Table.findByIdAndRemove({_id: tableId},req.body,(err,table)=>{
        if(err){
            res.status(500).send({message: "Error " + err});
        }else if (!table){
            res.status(404).send({message: "No existe"});
        }else if(!err){
            res.status(200).send({message: "Tabla eliminada"});
        }
    });
}

function updateTable(req,res){}

module.exports = {
    getTableProject,
    postTable,
    deleteTableById,
    deleteTableByProject,
    updateTable
}