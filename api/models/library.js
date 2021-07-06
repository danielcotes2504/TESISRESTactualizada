'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librarySchema = Schema({
    name:String,
    language:String,
    imgUrl:String,
    fileUrl:String
});

module.exports = mongoose.model('Library',librarySchema);