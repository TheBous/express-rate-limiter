import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from "./src/routes";

//For env File 
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_SERVER!);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.info('Database Connected');
})

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is on fire at http://localhost:${port}`);
});