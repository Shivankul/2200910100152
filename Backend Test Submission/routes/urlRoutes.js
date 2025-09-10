import express from 'express';

const router = express.Router();

router.post('/',createShortUrl);
router.get("/:id", redirectUrl);


export default router;