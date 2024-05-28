import { Request, Response } from 'express';

import { login, logout } from '../services/auth.service';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await login({ username, password });
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    await logout();
    return res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};
