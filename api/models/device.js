'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = Schema({
    name:String,
    user:String,
    project:String,
    projectId:String,
    variables:[]

});

module.exports = mongoose.model('Device',deviceSchema);