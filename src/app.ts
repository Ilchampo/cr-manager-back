import express from 'express';

import userRoutes from './routes/user.routes';
import pullRequestRoutes from './routes/pullRequest.routes';
import releaseRoutes from './routes/release.routes';
import authRoutes from './routes/auth.routes';
import Database from './config/database';
import config from './config/config';

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', pullRequestRoutes);
app.use('/api', releaseRoutes);

const startServer = async () => {
  try {
    await Database.connect();
    const port = config.port ?? 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

export { app, startServer };
