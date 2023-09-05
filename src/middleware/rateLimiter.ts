import { NextFunction, Request, Response } from "express";
import assert from "assert";
import { rateLimit } from 'express-rate-limit'

import APIKey from "../model/APIKey";
import { redisClient } from "../..";

interface RateLimiterRule {
    time: number;
    limit: number;
};

const rateLimiter = (rule: RateLimiterRule = { time: 60, limit: 3 }) => {
    const { time, limit } = rule ?? {};
    return async (req: Request, res: Response, next: NextFunction) => {
        const { apikey } = req.query;
        assert(!!apikey, "API Key is required");

        const exist = APIKey.exists({ _id: apikey });
        assert(exist, "API Key is invalid");

        const requests = await redisClient.incr(apikey?.toString());

        if (requests === 1) await redisClient.expire(apikey?.toString(), time);
        if (requests > limit) {
            return res.status(429).json({
                message: "Too many requests"
            });
        }

        next();
    }


};

export default rateLimiter;