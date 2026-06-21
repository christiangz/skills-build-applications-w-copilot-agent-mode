import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard.js';

const router = Router();

router.get('/', async (req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ position: 1 }).lean();
  res.json(leaderboard);
});

export default router;
