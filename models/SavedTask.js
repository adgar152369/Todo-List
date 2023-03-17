const mongoose = require('mongoose');

const savedTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

const SavedTask = mongoose.model("SavedTask", savedTaskSchema);

module.exports = SavedTask;