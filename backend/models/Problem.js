const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    testCases: { type: Array, default: [] }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
