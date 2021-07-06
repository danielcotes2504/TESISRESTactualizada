'use strict'

var Chart = require('../models/chart');


/**
 * Método para consultar las graficas de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function getChartProject(req,res){
    
    var chartProject = req.params.project;

    Chart.find({project: chartProject},['datas','labels','project','user','type','title'], (err,chart) => {
        if(err){
            res.status(500).send({ message: "Error "+ err});
        }else{
            if(!chart){
                res.status(404).send({ message: "Esta gráfica no existe"});

            }else if(chart.length == 0){
                res.status(200).send({ message: "Este proyecto no tiene graficas"});

            }else{
                res.status(200).send({ chart });
            }
        }
    })
}

/**
 * Método para crear un doumento de una gráfica.
 * @param {*} req 
 * @param {*} res 
 */
function postChart(req, res){
    
    var chart = new Chart();
    var params = req.body;

    chart.project = params.project;
    chart.user = params.user;
    chart.type = params.type;
    chart.datas = params.datas;
    chart.labels = params.labels;
    chart.title = params.title;
    
    chart.save((err, chartStored) => {
        if(err){
            
            res.status(404).send({ message: 'Error ' + err});
        }else{
            res.status(200).send({ chart: chartStored });
        }
    });
}

/**
 * Método para eliminar todas las gráficas de un proyecto.
 * @param {*} req 
 * @param {*} res 
 */
function deleteChartByProject(req,res){

    var project = req.params.project;

    Chart.find({project: project},req.body,(err, chart) =>{
        if(err){
            res.status(500).send({ message: "Error"});
        }else if(!chart){
            res.status(404).send({ message: "No existe"});
        }else{
            Chart.remove((err) =>{
                if(err){
                    res.status(500).send({ message: "Error al eliminar"});
                }else{
                    res.status(200).send({ message: "Gráfica eliminada."});
                }
            });  
        }
    });
}

/**
 * Método para eliminar una gráfica por su id.
 * @param {*} req 
 * @param {*} res 
 */
function deleteChartById(req,res){

    var chartId = req.params.id;

    Chart.findByIdAndRemove({_id : chartId},req.body,(err,chart) => {
        if(err){
            res.status(500).send({ message: "Error"});

        }else if(!chart){
            res.status(404).send({ message: "No existe"});

        }else if(!err){
            res.status(200).send({ message: "Gráfica eliminada id", id: chart._id});
        }
    });
}

module.exports = {
    getChartProject,
    postChart,
    deleteChartByProject,
    deleteChartById
}