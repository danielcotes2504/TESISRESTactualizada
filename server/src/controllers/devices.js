// const Users = require('../models/user');
// const Projects = require('../models/project');
const Devices = require('../models/device');
const Variables = require('../models/variable');
const Values = require('../models/value');

const devices = {};

//Only devices
/* function getDevices(req, res) {

    Devices.find({},(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    })
};

//Devices whith user
function getDevicesU(req, res) {

    const {user} = req.params;

    const query = {'user':user};

    Devices.find( query,(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    });
}; */

//Devices whit User and Project
function getDevicesUP(req, res) {

    const {user} = req.params;
    const {project} = req.params;

    const query = {'user':user,'project':project};

    Devices.find( query,(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    });
};

//Device specified
function getDevice(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {deviceH} = req.params;

    const query = {'user':user, 'project':project, 'deviceN':deviceN, 'deviceH':deviceH};

    Devices.find( query, async (err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error searching'});
        } else {
            res.status(200).send(results);
        }
    });
};

function postDevice(req, res) {

    const device = new Devices();

    const user = req.params.user;
    const project = req.params.project;
    const deviceN = req.body.deviceN;
    const deviceH = req.body.deviceH;

    device.user = user
    device.project = project;
    device.deviceN = deviceN;
    device.deviceH = deviceH;

    device.save((err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error saving'});
        } else {
            res.status(200).send({message: 'Saved'});
        };
    });
};

function putDevice(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {deviceH} = req.params;

    const newProject = req.body.project;
    const newDeviceN = req.body.deviceN;
    const newDeviceH = req.body.deviceH;

    const query = {'user':user, 'project':project, 'deviceN':deviceN, 'deviceH':deviceH};
    const newValues = { $set: {'project':newProject, 'deviceN':newDeviceN, 'deviceH':newDeviceH}};

    Devices.updateOne( query,newValues, async(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error updating'});
        } else {
            if(results.n > 0){
                await Variables.updateMany( query, newValues);
                await Values.updateMany( query, newValues);
                res.status(200).send({message: 'Updated'});
            } else {
                res.status(404).send({message:'Device not found'});
            }
        }
    });
};

function deleteDevice(req, res) {

    const {user} = req.params;
    const {project} = req.params;
    const {deviceN} = req.params;
    const {deviceH} = req.params;

    const query = {'user':user, 'project':project, 'deviceN':deviceN,'deviceH':deviceH};

    Devices.deleteOne(query, async(err, results) => {
        if(err){
            res.status(500).send({ERROR:'Error removing'});
        } else {
            if(results.n > 0){
                await Variables.deleteMany(query);
                await Values.deleteMany(query);
                res.status(200).send({message: 'Deleted'});
            } else {
                res.status(404).send({message:'Device not found'});
            }
        }
    });
};

/* devices.getDevices = getDevices;
devices.getDevicesU = getDevicesU; */
devices.getDevicesUP = getDevicesUP;
devices.getDevice = getDevice;
devices.postDevice = postDevice;
devices.putDevice = putDevice;
devices.deleteDevice = deleteDevice;

module.exports = devices;