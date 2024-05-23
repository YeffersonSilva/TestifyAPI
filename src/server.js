import express from 'express';
import dotenv from 'dotenv';
import { router as userRouter } from './routes/users.js';
import { router as productRouter } from './routes/products.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the users and products routes
app.use('/users', userRouter);
app.use('/products', productRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
