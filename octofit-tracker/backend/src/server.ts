import { app, connectDB, PORT } from './index.js';

const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://127.0.0.1:${PORT}`;

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
