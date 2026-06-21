import express from 'express';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { connectDB, MONGODB_URI } from './config/database.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://127.0.0.1:${PORT}`;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/config', (_, res) => {
  res.json({ apiBaseUrl: API_BASE_URL, port: PORT });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker API' });
});

connectDB()
  .then(() => {
    console.log('Connected to MongoDB at', MONGODB_URI);
    console.log('Using API base URL:', API_BASE_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
