import { app, connectDB, PORT, API_BASE_URL } from './index.js';

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Using API base URL:', API_BASE_URL);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend listening on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
