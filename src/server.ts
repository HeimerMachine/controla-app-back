import express, { Request, Response } from 'express';
import { SERVER } from './config/config';
import { routes as userRoutes } from './routes/index';
import { errorMiddleware } from './middleware/errorMiddleware';
import { routes as financeRoutes } from './routes/finance/index';
import cors from 'cors';
const app = express();
const PORT = SERVER.SERVER_PORT;

app.use(cors({
    origin: '*', // Allow all origins, adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use(userRoutes);
app.use(financeRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});