import { Request, Response } from 'express';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserPassword,
  deleteUser,
} from '../services/user.service';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser({
      userId: req.params.userId,
      ...req.body,
    });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedUser = await updateUserPassword({
      userId: req.params.userId,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteUser({ userId: req.params.userId });
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(deletedUser);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};
