import dotenv from 'dotenv';

import type { IConfig } from '../interfaces/config.interface';

dotenv.config();

const config: IConfig = {
  port: process.env.APP_PORT ?? 5000,
  corsOrigins: process.env.APP_CORS_ORIGINS ?? ['*'],
  jwtSecret: process.env.APP_JWT_SECRET,
  mongo: {
    username: process.env.APP_MONGO_USERNAME,
    password: process.env.APP_MONGO_PASSWORD,
    base: process.env.APP_MONGO_URI,
  },
};

export default config;
