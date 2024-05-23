import express from 'express';
import dotenv from 'dotenv';
import { router as userRouter } from './routes/users.js';
import { router as productRouter } from './routes/products.js';
import { router as clientRouter } from './routes/clients.js'; // Importa la nueva ruta

dotenv.config();

const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Usa las rutas de usuarios, productos y clientes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/clients', clientRouter); // Agrega la nueva ruta

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
