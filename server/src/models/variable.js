const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variableSchema = new Schema({
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
    positive: {
        type: Number,
        default: Math.PI
    },
    negative: {
        type: Number,
        default: Math.PI
    }
})

module.exports = mongoose.model('variables', variableSchema);