import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config/config';
import type {
  ILoginParams,
  ILoginResponse,
} from '../interfaces/auth.interface';
import User from '../models/user.model';

const login = async (params: ILoginParams): Promise<ILoginResponse> => {
  try {
    const { username, password } = params;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ userId: user._id }, config.jwtSecret ?? '', {
      expiresIn: '1h',
    });

    return { user, token };
  } catch (error) {
    throw new Error(`Error logging in: ${error as string}`);
  }
};

const logout = async (): Promise<void> => {
  return;
};

export { login, logout };
