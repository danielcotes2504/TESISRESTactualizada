'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = Schema({
    project:String,
    user:String,
    datas:[],
    dates:[],
    title:String

});

module.exports = mongoose.model('Table',tableSchema);