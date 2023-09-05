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
const assert_1 = __importDefault(require("assert"));
const APIKey_1 = __importDefault(require("../model/APIKey"));
const __1 = require("../..");
;
const rateLimiter = (rule = { time: 60, limit: 3 }) => {
    const { time, limit } = rule !== null && rule !== void 0 ? rule : {};
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { apikey } = req.query;
        (0, assert_1.default)(!!apikey, "API Key is required");
        const exist = APIKey_1.default.exists({ _id: apikey });
        (0, assert_1.default)(exist, "API Key is invalid");
        const requests = yield __1.redisClient.incr(apikey === null || apikey === void 0 ? void 0 : apikey.toString());
        if (requests === 1)
            yield __1.redisClient.expire(apikey === null || apikey === void 0 ? void 0 : apikey.toString(), time);
        if (requests > limit) {
            return res.status(429).json({
                message: "Too many requests"
            });
        }
        next();
    });
};
exports.default = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map