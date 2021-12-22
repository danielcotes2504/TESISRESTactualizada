const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('topics', topicSchema);