import { Router } from 'express';

import {
  loginController,
  logoutController,
} from '../controllers/auth.controller';

const router = Router();

/**
 * @method: POST
 * @url: /api/auth/login
 * @params: Body { username, password }
 */
router.post('/auth/login', loginController);

/**
 * @method: POST
 * @url: /api/auth/logout
 * @params: None
 */
router.post('/auth/logout', logoutController);

export default router;
