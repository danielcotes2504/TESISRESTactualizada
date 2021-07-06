'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    id: String,
    topic: String,
    user: String,
    payload: String,
    clientID: String,
    qos: String,
    publicationDate: String
});

module.exports = mongoose.model('Message', messageSchema);