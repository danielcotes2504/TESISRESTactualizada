'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dashboardSchema = Schema({
    project:String,
    user:String

});

module.exports = mongoose.model('Dashboard',dashboardSchema);