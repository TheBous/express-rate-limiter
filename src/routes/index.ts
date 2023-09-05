import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/example', (req: Request, res: Response) => {
    res.send('Get All API')
})

export default router;