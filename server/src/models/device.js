const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    deviceN: {
        type: String,
        required: true
    },
    deviceH: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('devices', deviceSchema);