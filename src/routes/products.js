import express from 'express';
const router = express.Router();

// Sample products data
let products = [
    { id: 'P0001', name: 'Product 1', price: 100 },
    { id: 'P0002', name: 'Product 2', price: 200 }
];

// GET all products
router.get('/', (req, res) => {
    return res.status(200).json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        return res.status(200).json(product);
    }
    return res.status(404).json({ message: 'Product not found' });
});

// POST create a new product
router.post('/', (req, res) => {
    const { name, price } = req.body;
    if (name && price) {
        const newProduct = { id: `P000${products.length + 1}`, name, price };
        products.push(newProduct);
        return res.status(201).json({ message: 'Product created' });
    }
    return res.status(400).json({ message: 'Product not created' });
});

// PUT update product by ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        const { name, price } = req.body;
        if (name && price) {
            product.name = name;
            product.price = price;
            return res.status(200).json({ message: 'Product updated' });
        }
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(404).json({ message: 'Product not found' });
});

// DELETE product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        return res.status(200).json({ message: 'Product deleted' });
    }
    return res.status(404).json({ message: 'Product not found' });
});

export { router };
