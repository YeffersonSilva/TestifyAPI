import express from 'express';
const router = express.Router();

// Datos de ejemplo para clientes
let clients = [
    { id: 'C0001', name: 'Client 1', email: 'client1@example.com' },
    { id: 'C0002', name: 'Client 2', email: 'client2@example.com' }
];

// GET todos los clientes
router.get('/', (req, res) => {
    return res.status(200).json(clients);
});

// GET cliente por ID
router.get('/:id', (req, res) => {
    const client = clients.find(c => c.id === req.params.id);
    if (client) {
        return res.status(200).json(client);
    }
    return res.status(404).json({ message: 'Client not found' });
});

// POST crear un nuevo cliente
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        const newClient = { id: `C000${clients.length + 1}`, name, email };
        clients.push(newClient);
        return res.status(201).json({ message: 'Client created' });
    }
    return res.status(400).json({ message: 'Client not created' });
});

// PUT actualizar cliente por ID
router.put('/:id', (req, res) => {
    const client = clients.find(c => c.id === req.params.id);
    if (client) {
        const { name, email } = req.body;
        if (name && email) {
            client.name = name;
            client.email = email;
            return res.status(200).json({ message: 'Client updated' });
        }
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(404).json({ message: 'Client not found' });
});

// DELETE cliente por ID
router.delete('/:id', (req, res) => {
    const clientIndex = clients.findIndex(c => c.id === req.params.id);
    if (clientIndex !== -1) {
        clients.splice(clientIndex, 1);
        return res.status(200).json({ message: 'Client deleted' });
    }
    return res.status(404).json({ message: 'Client not found' });
});

export { router };
