import type { Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
