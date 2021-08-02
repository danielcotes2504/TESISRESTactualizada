'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: String
});

module.exports = mongoose.model('User', userSchema);