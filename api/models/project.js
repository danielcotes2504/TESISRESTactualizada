'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
    name:String, //TOPICO
    user:String
});

module.exports = mongoose.model('Project', projectSchema);