const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valueSchema = new Schema({
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
    },
    variableN: {
        type: String,
        required: true
    },
    variableT: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    variableInd: {
        type: String,
        default: '-'
    },
    constant: {
        type: Number,
        default: 0
    },
    operation: {
        type: String,
        default: '-'
    },
    date: String,
    positive: {
        type: Number,
        default: null
    },
    negative: {
        type: Number,
        default: null
    }
})

module.exports = mongoose.model('values', valueSchema);