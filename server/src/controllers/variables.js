// const Users = require('../models/user');
// const Projects = require('../models/project');
// const Devices = require('../models/device');
const Variables = require('../models/variable');
const Values = require('../models/value');


const variables = {};

/* //Only Variables
function getVariables(req, res) {

    Variables.find({},(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    })
}; */

//Variables whith user
function getVariablesU(req, res) {

    const { user } = req.params;

    const query = { 'user': user };

    Variables.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error searching' });
        } else {
           return res.status(200).send(results);
           
        }
    });
};

//Variables whit User and Project
function getVariablesUP(req, res) {
   
    const { user } = req.params;
    const { project } = req.params;

    const query = { 'user': user, 'project': project };

    Variables.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error searching' })
            console.log("user and project error: " + err)

        } else {
            res.status(200).send(results);
        }
    });
};

//Variables with user, project and device
function getVariablesUPD(req, res) {

    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;

    const query = { 'user': user, 'project': project, 'deviceN': deviceN };

    Variables.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error al buscar' });
            console.log("user and project and device error: " + err)
        } else {
            res.status(200).send(results);
        }
    });
};

//Variable specified
function getVariable(req, res) {

    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;

    const query = { 'user': user, 'project': project, 'deviceN': deviceN, 'variableN': variableN };

    Variables.find(query, (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error searching' });
        } else {
            res.status(200).send(results);
        }
    });
};

function postVariable(req, res) {

    const variable = new Variables();

    const user = req.params.user;
    const project = req.params.project;
    const deviceN = req.params.deviceN;
    const deviceH = req.params.deviceH;
    const newVariableN = req.body.variableN;
    const newVariableT = req.body.variableT;
    const newVariableInd = req.body.variableInd;
    const newConstant = req.body.constant;
    const newOperation = req.body.operation;
    const newPositive = req.body.positive;
    const newNegative = req.body.negative;

    variable.user = user;
    variable.project = project;
    variable.deviceN = deviceN;
    variable.deviceH = deviceH;
    variable.variableN = newVariableN;
    variable.variableT = newVariableT;
    variable.variableInd = newVariableInd;
    variable.constant = newConstant;
    variable.operation = newOperation;
    variable.positive = newPositive;
    variable.negative = newNegative;

    
 

    variable.save((err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error saving' });
        } else {
            

            res.status(200).send({ message: 'Saved' });
        }
    });
};

function putVariable(req, res) {

    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { variableN } = req.params;

    const newVariableN = req.body.variableN;
    const newVariableT = req.body.variableT;
    const newVariableInd = req.body.variableInd;
    const newConstant = req.body.constant;
    const newOperation = req.body.operation;
    const newPositive = req.body.positive;
    const newNegative = req.body.negative;

    const query = { 'user': user, 'project': project, 'deviceN': deviceN, 'variableN': variableN };
    const newValues = { $set: { 'variableN': newVariableN, 'variableT': newVariableT, 'variableInd': newVariableInd, 'constant': newConstant, 'operation': newOperation, 'positive': newPositive, 'negative': newNegative } };

    Variables.updateOne(query, newValues, async (err, results) => {
        if (err) {
            res.status(500).send({ ERROR: 'Error updating' });
        } else {
            if (results.n > 0) {
                await Values.updateMany(query, newValues);
                res.status(200).send({ message: 'Updated' });
            } else {
                res.status(404).send({ message: 'Variable not found' });
            };
        };
    });
};

function deleteVariable(req, res) {

    const { user } = req.params;
    const { project } = req.params;
    const { deviceN } = req.params;
    const { deviceH } = req.params;
    const { variableN } = req.params;
    const { variableT } = req.params;


    const query = { 'user': user, 'project': project, 'deviceN': deviceN, 'deviceH': deviceH, 'variableN': variableN, 'variableT': variableT };

    if (variableT === 'Dependiente') {
        Variables.deleteOne(query, async (err, results) => {
            if (err) {
                res.status(500).send({ ERROR: 'Error removing' });
            } else {
                if (results.n > 0) {
                    await Values.deleteMany(query);
                    res.status(200).send({ message: 'Deleted' });
                } else {
                    res.status(404).send({ message: 'Variable not found' });
                }
            }
        });
    } else if (variableT === 'Independiente') {


        const query2 = { 'user': user, 'variableInd': variableN };


        Variables.deleteOne(query, async (err, results) => {
            if (err) {
                res.status(500).send({ ERROR: 'Error removing' });
            } else {
                if (results.n > 0) {
                    await Values.deleteMany(query);
                    res.status(200).send({ message: 'Deleted' });
                    Variables.deleteMany(query2, async (err, results) => {
                        if (err) {
                            res.status(500).send({ ERROR: 'Error removing' });
                        } else {
                            if (results.n > 0) {
                                await Values.deleteMany(query2);

                                res.status(200).send({ message: 'Deleted' });
                            } else {
                                res.status(404).send({ message: 'Variable not found' });
                            }



                        }
                    });

                } else {
                    res.status(404).send({ message: 'Variable not found' });
                }
            }
        });

    }





};

// variables.getVariables = getVariables;
variables.getVariablesU = getVariablesU;
variables.getVariablesUP = getVariablesUP;
variables.getVariablesUPD = getVariablesUPD;
variables.getVariable = getVariable;
variables.postVariable = postVariable;
variables.putVariable = putVariable;
variables.deleteVariable = deleteVariable;
module.exports = variables;