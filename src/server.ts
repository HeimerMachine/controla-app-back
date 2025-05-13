import express, { Request, Response } from 'express';
import { SERVER } from './config/config.js';
import { routes as UserRoutes } from './routes/index.js';

const app = express();
const PORT = SERVER.SERVER_PORT;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use("/user", UserRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});