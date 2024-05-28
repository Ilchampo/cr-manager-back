import { Router } from 'express';

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  updateUserPasswordController,
  deleteUserController,
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @method: POST
 * @url: /api/users
 * @params: Body { firstname, lastname, username, password }
 */
router.post('/users', authMiddleware, createUserController);

/**
 * @method: GET
 * @url: /api/users
 * @params: None
 */
router.get('/users', authMiddleware, getAllUsersController);

/**
 * @method: GET
 * @url: /api/users/:userId
 * @params: Params { userId }
 */
router.get('/users/:userId', authMiddleware, getUserByIdController);

/**
 * @method: PUT
 * @url: /api/users/:userId
 * @params: Params { userId }, Body { firstname, lastname, username }
 */
router.put('/users/:userId', authMiddleware, updateUserController);

/**
 * @method: PUT
 * @url: /api/users/:userId/password
 * @params: Params { userId }, Body { currentPassword, newPassword }
 */
router.put(
  '/users/:userId/password',
  authMiddleware,
  updateUserPasswordController,
);

/**
 * @method: DELETE
 * @url: /api/users/:userId
 * @params: Params { userId }
 */
router.delete('/users/:userId', authMiddleware, deleteUserController);

export default router;
