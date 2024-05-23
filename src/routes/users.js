import express from 'express';
const router = express.Router();

// Sample users data
let users = [
    { id: 'U0001', name: 'John Doe' },
    { id: 'U0002', name: 'Jane Doe' }
];

// GET all users
router.get('/', (req, res) => {
    return res.status(200).json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found' });
});

// POST create a new user
router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const newUser = { id: `U000${users.length + 1}`, name: username };
        users.push(newUser);
        return res.status(201).json({ message: 'User created' });
    }
    return res.status(400).json({ message: 'User not created' });
});

// PUT update user by ID
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        const { name } = req.body;
        if (name) {
            user.name = name;
            return res.status(200).json({ message: 'User updated' });
        }
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(404).json({ message: 'User not found' });
});

// DELETE user by ID
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.status(200).json({ message: 'User deleted' });
    }
    return res.status(404).json({ message: 'User not found' });
});

export { router };
