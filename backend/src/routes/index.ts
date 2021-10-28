import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.send('hello world');
});

export default router;
