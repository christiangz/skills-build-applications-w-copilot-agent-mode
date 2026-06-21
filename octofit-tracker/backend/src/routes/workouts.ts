import { Router } from 'express';
import WorkoutModel from '../models/workout.js';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await WorkoutModel.find().lean();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const { name, focus, durationMinutes } = req.body;

  if (!name || !focus || !durationMinutes) {
    return res.status(400).json({ error: 'Missing required workout fields' });
  }

  try {
    const workout = new WorkoutModel({ name, focus, durationMinutes });
    await workout.save();
    res.status(201).json(workout.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Unable to create workout' });
  }
});

export default router;
