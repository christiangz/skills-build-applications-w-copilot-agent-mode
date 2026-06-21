import { Router } from 'express';
import TeamModel from '../models/team.js';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await TeamModel.find().lean();
  res.json(teams);
});

router.post('/', async (req, res) => {
  const { name, members } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required field: name' });
  }

  try {
    const team = new TeamModel({ name, members: typeof members === 'number' ? members : 0 });
    await team.save();
    res.status(201).json(team.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team' });
  }
});

export default router;
