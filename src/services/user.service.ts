import bcrypt from 'bcryptjs';

import type {
  ICreateUserParams,
  IDeleteUserParams,
  IUpdateUserParams,
  IUpdateUserPasswordParams,
} from '../interfaces/user.service.interface';
import type { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

export const createUser = async (params: ICreateUserParams): Promise<IUser> => {
  try {
    const { firstname, lastname, username, password } = params;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already taken');
    }
    const user = new User({
      firstname,
      lastname,
      username,
      password,
    });
    return await user.save();
  } catch (error) {
    throw new Error(`Error creating user: ${error as string}`);
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find().lean();
  } catch (error) {
    throw new Error(`Error fetching users: ${error as string}`);
  }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId).lean();
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error as string}`);
  }
};

export const updateUser = async (
  params: IUpdateUserParams,
): Promise<IUser | null> => {
  try {
    const { userId, firstname, lastname, username } = params;
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && (existingUser._id as string) !== userId) {
        throw new Error('Username already taken');
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname, username },
      { new: true, runValidators: true },
    ).lean();
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error as string}`);
  }
};

export const updateUserPassword = async (
  params: IUpdateUserPasswordParams,
): Promise<IUser | null> => {
  try {
    const { userId, currentPassword, newPassword } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }
    user.password = newPassword;
    const savedUser = await user.save();
    return savedUser.toObject();
  } catch (error) {
    throw new Error(`Error updating user password: ${error as string}`);
  }
};

export const deleteUser = async (
  params: IDeleteUserParams,
): Promise<IUser | null> => {
  try {
    const { userId } = params;
    return await User.findByIdAndDelete(userId).lean();
  } catch (error) {
    throw new Error(`Error deleting user: ${error as string}`);
  }
};
