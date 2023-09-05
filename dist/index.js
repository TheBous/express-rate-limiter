"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    exports.redisClient = (0, redis_1.createClient)();
    exports.redisClient.on("error", (error) => console.error(`Error : ${error}`));
    exports.redisClient.on("connect", () => console.info(`Redis connected`));
    yield exports.redisClient.connect();
}))();
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.listen(port, () => {
    console.log(`Server is on fire at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map