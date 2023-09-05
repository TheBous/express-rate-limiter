import express, { Request, Response } from 'express';
import APIKey from "../model/APIKey";
import rateLimiter from '../middleware/rateLimiter';

const router = express.Router();

router.get('/get_api_keys', rateLimiter(), async (req: Request, res: Response) => {
    const apiKeys = await APIKey.find();
    res.send(apiKeys)
})

export default router;