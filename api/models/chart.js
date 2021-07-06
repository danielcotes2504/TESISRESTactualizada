'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chartSchema = Schema({
    project:String,
    user:String,
    type:String,
    datas:[],
    labels:[],
    title:String

});

module.exports = mongoose.model('Chart',chartSchema);