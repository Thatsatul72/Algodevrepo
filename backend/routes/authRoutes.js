const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this is correctly imported
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { body, validationResult } = require('express-validator');

// Register a new user
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
        let existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log the hashed password

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const payload = {
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            }
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// User login
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid user.' });
         console.log(username  +" "+ password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch); // Log the result of the password comparison

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
