import { Router } from 'express';
import UserModel from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await UserModel.find().lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, teamId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name, email' });
  }

  try {
    const user = new UserModel({ name, email, teamId });
    await user.save();
    res.status(201).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user' });
  }
});

export default router;
