import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import redis from 'redis';
import { createClient } from 'redis';

import routes from "./src/routes";

//For env File 
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use('/api', routes);

// Mongoose
mongoose.connect(`${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}`);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.info('Database Connected');
})

const client = createClient();
client.connect();
client.on('connect', () => console.info('Connected to redis successfully'));
client.on('error', err => console.error('Redis Client Error', err));

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is on fire at http://localhost:${port}`);
});