'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = Schema({
    value:String,
    user:String
});

module.exports = mongoose.model('Token',tokenSchema);