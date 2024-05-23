const express = require('express');
const router = express.Router();

// Define la variable users
const users = [
    { id: 'U0001', name: 'John Doe' },
    { id: 'U0002', name: 'Jane Doe' }
];

router.get('/', (req, res) => {
    return res.status(200).json(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found' });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        
        return res.status(201).json({ message: 'User created' });
    }
    return res.status(400).json({ message: 'User not created' });
});

module.exports = { router };
