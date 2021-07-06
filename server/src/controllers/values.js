// const Users = require('../models/user');
// const Projects = require('../models/project');
// const Devices = require('../models/device');
const Variables = require('../models/variable');
const Values = require('../models/value');

const values = {};

//Only Values
/* function getValues(req, res) {

    Values.find({},(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        };
    });
}; */

//Values whith user
/* function getValuesU(req, res) {

    const {user} = req.params;

    const query = {'user':user};

    Values.find( query,(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        };
    });
}; */

/* //Values whit User and Project
function getValuesUP(req, res) {

    const {user} = req.params;
    const {project} = req.params;

    const query = {'user':user,'project':project};

    Values.find( query,(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        };
    });
};

//Values with user, project and device
function getValuesUPD(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {deviceH} = req.params;

    const query = {'user':user,'project':project,'deviceN':deviceN,'deviceH':deviceH};

    Values.find( query,(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error al buscar'});
        } else {
            res.status(200).send(results);
        };
    });
}; */

//Values with user, project, device and variable
function getValuesUPDV(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {variableN} = req.params;

    const query = {'user':user,'project':project,'deviceN':deviceN,'variableN':variableN};

    Values.find( query, (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        };
    });
};

//Return the last value
function getValue(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {variableN} = req.params;

    const query = {'user':user,'project':project,'deviceN':deviceN,'variableN':variableN};

    Values.find( query, (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            const lastValue = results.length - 1;
            res.status(200).send(results[lastValue]);
        };
    });
};

function postValueI(req, res) {

    const value = new Values();

    const user = req.params.user;
    const project =req.params.project;
    const deviceN = req.params.deviceN;
    const deviceH = req.params.deviceH;
    const variableN = req.params.variableN;
    const variableT = req.params.variableT;
    const variableInd = req.params.variableInd;
    const constant = req.params.constant;
    const operation = req.params.operation;
    const valueN = req.body.value;
    const date = new Date().toUTCString();
    const positive = req.params.positive;
    const negative = req.params.negative;

    value.user = user;
    value.project = project;
    value.deviceN = deviceN;
    value.deviceH = deviceH;
    value.variableN = variableN;
    value.variableT = variableT;
    value.variableInd = variableInd;
    value.constant = constant;
    value.operation = operation;
    value.value = valueN;
    value.date = date;
    value.positive = positive;
    value.negative = negative;

    value.save((err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error saving'});
        } else {
            res.status(200).send({message: 'Saved'});
        }
    });

    const uri = {"user":user, "project":project, "deviceN":deviceN, "variableT":"Dependiente", "variableInd": variableN}
    Variables.find(uri, (err, results) => {
        if(results.length){

            for (let i = 0; i < results.length; i++) {

                const value2 = new Values();

                const user = results[i].user;
                const project = results[i].project;
                const deviceN = results[i].deviceN;
                const deviceH = results[i].deviceH;
                const variableN = results[i].variableN;
                const variableT = results[i].variableT;
                const variableInd = results[i].variableInd;
                const operation = results[i].operation;
                const constant = results[i].constant;
                var valueD = 0;
                const date = new Date().toUTCString();
                const positive = results[i].positive;
                var negative = results[i].negative;
    
                if(negative == (null || 31416)){
                    negative = valueN;
                }
    
                switch (operation){
                    case 'equal':
                        valueD = (valueN == constant) ? positive : negative;
                        break;
                    case 'different':
                        valueD = (valueN != constant) ? positive : negative;
                        break;
                    case 'greater':
                        valueD = (valueN > constant) ? positive : negative;
                        break;
                    case 'lesser':
                        valueD = (valueN < constant) ? positive : negative;
                        break;
                    default:
                        valueD = 0;
                };
    
                value2.user = user;
                value2.project = project;
                value2.deviceN = deviceN;
                value2.deviceH = deviceH;
                value2.variableN = variableN;
                value2.variableT = variableT;
                value2.variableInd = variableInd;
                value2.constant = constant;
                value2.operation = operation;
                value2.value = valueD;
                value2.date = date;
                value2.positive = positive;
                value2.negative = negative;
    
                value2.save();
                
            }
        };
    });
};

function deleteValues(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {deviceH} = req.params;
    const {variableN} = req.params;
    const {variableT} = req.params;

    const query = {'user':user, 'project':project, 'deviceN':deviceN, 'deviceH':deviceH, 'variableN':variableN, 'variableT':variableT};

    Values.deleteMany( query, (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error removing'});
        } else {
            if(results.n > 0){
                res.status(200).send({message: 'Deleted'});
            } else {
                res.status(404).send({message:'Values not found'});
            };
        };
    });
};

// values.getValues = getValues;
// values.getValuesU = getValuesU;
// values.getValuesUP = getValuesUP;
// values.getValuesUPD = getValuesUPD;
values.getValuesUPDV = getValuesUPDV;
values.getValue = getValue;
values.postValueI = postValueI;
values.deleteValues = deleteValues;

module.exports = values;