// const Users = require('../models/user');
const Projects = require('../models/project');
const Devices = require('../models/device');
const Variables = require('../models/variable');
const Values = require('../models/value');

const projects = {};

//Only projects
/* function getProjects(req, res) {

    Projects.find({},(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error al buscar'});
        } else {
            res.status(200).send(results);
        }
    })
}; */

//Projects whith user
function getProjectsU(req, res) {

    const {user} = req.params;
    const query = {'user':user};

    Projects.find( query, (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error al buscar'});
        } else {
            res.status(200).send(results);
        }
    });
};

//Project specified
function getProject(req, res) {

    const {user} = req.params;
    const {project} = req.params;

    const query = {'user':user, 'project':project};

    Projects.find( query, (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    });
};

function postProject(req, res) {

    const project = new Projects();

    const user = req.params.user;
    const projectN = req.body.project;

    project.user = user;
    project.project = projectN;
    
    project.save((err, results) => {
        if(err){
            console.log(err)
            res.status(500).send({ERROR:'Error saving'});
        } else {
            res.status(200).send({message: 'Saved'});
        };
    });
};

function putProject(req, res) {

    const {user} = req.params;
    const {project} = req.params;

    const newProject = req.body.project;

    const query = { 'user':user, 'project':project };
    const newValues = { $set: { 'project':newProject } };

    Projects.updateOne(query,newValues, async(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error updating'});
        } else {
            if(results.n > 0){
                await Devices.updateMany(query,newValues);
                await Variables.updateMany(query,newValues);
                await Values.updateMany( query, newValues);
                res.status(200).send({message: 'Updated'});
            } else {
                res.status(404).send({message:'Project not found'});
            };
        };
    });
};

function deleteProject(req, res) {

    const {user} = req.params;
    const {project} = req.params;

    const query = {'user':user, 'project':project};

    Projects.deleteOne( query, async(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error removing'});
        } else {
            if(results.n > 0){
                await Devices.deleteMany(query);
                await Variables.deleteMany(query);
                await Values.deleteMany(query);
                res.status(200).send({message: 'Deleted'});
            } else {
                res.status(404).send({message:'Project not found'});
            }
        }
    });
};

/* projects.getProjects = getProjects; */
projects.getProjectsU = getProjectsU;
projects.getProject = getProject;
projects.postProject = postProject;
projects.putProject = putProject;
projects.deleteProject = deleteProject;

module.exports = projects;
