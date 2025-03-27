import express, { Request, Response } from 'express';
import { SERVER_PORT } from './config/config.js';

const app = express();
const PORT = SERVER_PORT;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});