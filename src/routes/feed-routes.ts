import express from 'express';
const router = express.Router();

import { getPaginatedFeeds } from '../controllers/feed-controller';

router.get('/latest', getPaginatedFeeds);

export default router;
