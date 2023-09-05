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
const express_1 = __importDefault(require("express"));
const APIKey_1 = __importDefault(require("../model/APIKey"));
const rateLimiter_1 = __importDefault(require("../middleware/rateLimiter"));
const router = express_1.default.Router();
router.get('/get_api_keys', (0, rateLimiter_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKeys = yield APIKey_1.default.find();
    res.send(apiKeys);
}));
exports.default = router;
//# sourceMappingURL=index.js.map