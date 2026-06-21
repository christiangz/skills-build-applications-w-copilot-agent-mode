import { Router } from 'express';
import ActivityModel from '../models/activity.js';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await ActivityModel.find().lean();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, calories, date } = req.body;

  if (!userId || !type || !durationMinutes || !calories || !date) {
    return res.status(400).json({ error: 'Missing required activity fields' });
  }

  try {
    const activity = new ActivityModel({
      userId,
      type,
      durationMinutes,
      calories,
      date: new Date(date),
    });
    await activity.save();
    res.status(201).json(activity.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Unable to create activity' });
  }
});

export default router;
