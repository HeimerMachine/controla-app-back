import express, { Request, Response } from 'express';
import { SERVER } from './config/config';
import { routes } from './routes/index';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();
const PORT = SERVER.SERVER_PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use(routes);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});