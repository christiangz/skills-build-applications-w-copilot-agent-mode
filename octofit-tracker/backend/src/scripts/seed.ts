import mongoose from 'mongoose';
import UserModel from '../models/user.js';
import TeamModel from '../models/team.js';
import ActivityModel from '../models/activity.js';
import LeaderboardModel from '../models/leaderboard.js';
import WorkoutModel from '../models/workout.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  try {
    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const teams = await TeamModel.insertMany([
      { name: 'Sunrise Sprinters', members: 10 },
      { name: 'Moonlight Movers', members: 12 },
      { name: 'Peak Performance', members: 9 },
    ]);

    const users = await UserModel.insertMany([
      { name: 'Avery Morgan', email: 'avery@octofit.app', teamId: teams[0].id },
      { name: 'Jordan Lee', email: 'jordan@octofit.app', teamId: teams[1].id },
      { name: 'Kai Patel', email: 'kai@octofit.app', teamId: teams[2].id },
    ]);

    await ActivityModel.insertMany([
      {
        userId: users[0].id,
        type: 'Run',
        durationMinutes: 34,
        calories: 380,
        date: new Date('2026-06-18'),
      },
      {
        userId: users[1].id,
        type: 'Yoga',
        durationMinutes: 55,
        calories: 210,
        date: new Date('2026-06-19'),
      },
      {
        userId: users[2].id,
        type: 'Strength Training',
        durationMinutes: 45,
        calories: 430,
        date: new Date('2026-06-20'),
      },
    ]);

    await LeaderboardModel.insertMany([
      { position: 1, team: 'Moonlight Movers', score: 980 },
      { position: 2, team: 'Sunrise Sprinters', score: 920 },
      { position: 3, team: 'Peak Performance', score: 860 },
    ]);

    await WorkoutModel.insertMany([
      { name: 'Morning HIIT', focus: 'Cardio', durationMinutes: 30 },
      { name: 'Strength Builder', focus: 'Muscle', durationMinutes: 45 },
      { name: 'Recovery Stretch', focus: 'Mobility', durationMinutes: 25 },
    ]);

    console.log('Seed complete: users, teams, activities, leaderboard, workouts created');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('Unhandled seed error:', error);
  process.exit(1);
});
