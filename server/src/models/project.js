const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('projects', projectSchema);