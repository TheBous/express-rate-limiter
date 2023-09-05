"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("redis");
const routes_1 = __importDefault(require("./src/routes"));
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// Mongoose
mongoose_1.default.connect(`${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}`);
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.error(error);
});
database.once('connected', () => {
    console.info('Database Connected');
});
const client = (0, redis_1.createClient)({
    url: ""
});
client.on('connect', () => console.info('Connected to redis successfully'));
client.on('error', err => console.error('Redis Client Error', err));
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.listen(port, () => {
    console.log(`Server is on fire at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map