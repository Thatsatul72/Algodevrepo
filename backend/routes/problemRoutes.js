const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const problem = require('../models/Problem');

// Create a problem (admin only)
router.post('/problems', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const newProblem = new problem(req.body);
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all problems (public access)
router.get('/problems', async (req, res) => {
    try {
        const problems = await problem.find();
        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a problem by ID (public access)
router.get('/problems/:id', async (req, res) => {
    try {
        const problem = await problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ message: 'Problem not found.' });
        res.status(200).json(problem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a problem by ID (admin only)
router.put('/problems/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const updatedProblem = await problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProblem) return res.status(404).json({ message: 'Problem not found.' });
        res.status(200).json(updatedProblem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a problem by ID (admin only)
router.delete('/problems/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await problem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Problem deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
