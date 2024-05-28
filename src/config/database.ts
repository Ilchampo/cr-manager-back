import mongoose from 'mongoose';

import buildMongoUri from '../utils/buildMongoUri';
import config from './config';

const MONGODB_URI = buildMongoUri(
  config.mongo.username,
  config.mongo.password,
  config.mongo.base,
);

class Database {
  private static instance: mongoose.Connection | null = null;

  private constructor() {}

  static async connect(): Promise<mongoose.Connection> {
    if (!Database.instance) {
      try {
        await mongoose.connect(MONGODB_URI ?? '', {
          user: config.mongo.username,
          pass: config.mongo.password,
        });
        Database.instance = mongoose.connection;
        Database.instance.on('connected', () => {
          console.log('Connected to MongoDB');
        });
        Database.instance.on('error', (err) => {
          console.error(`MongoDB connection error: ${err}`);
        });
      } catch (error: unknown) {
        console.error('Error connecting to MongoDB:', error as string);
        throw new Error(error as string);
      }
    }
    return Database.instance;
  }

  static async disconnect(): Promise<void> {
    if (Database.instance) {
      await mongoose.disconnect();
      Database.instance = null;
      console.log('Disconnected from MongoDB');
    }
  }
}

export default Database;
