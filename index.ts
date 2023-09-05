import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import redis from 'redis';
import { createClient } from 'redis';

import routes from "./src/routes";
import { RedisClientType } from '@redis/client';

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

export let redisClient: RedisClientType;

(async () => {
    redisClient = createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    redisClient.on("connect", () => console.info(`Redis connected`));
    await redisClient.connect();
})();

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is on fire at http://localhost:${port}`);
});