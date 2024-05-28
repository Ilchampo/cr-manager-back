import { Router } from 'express';

import {
  createReleaseController,
  getReleaseController,
  getAllReleasesController,
  updateReleaseStatusController,
  updateReleaseInformationController,
  deleteReleaseController,
} from '../controllers/release.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @method: POST
 * @url: /api/releases
 * @params: Body { name, releaseDate, pullRequests }
 */
router.post('/releases', authMiddleware, createReleaseController);

/**
 * @method: GET
 * @url: /api/releases
 * @params: None
 */
router.get('/releases', authMiddleware, getAllReleasesController);

/**
 * @method: GET
 * @url: /api/releases/:releaseId
 * @params: Params { releaseId }
 */
router.get('/releases/:releaseId', authMiddleware, getReleaseController);

/**
 * @method: PUT
 * @url: /api/releases/:releaseId/status
 * @params: Params { releaseId }, Body { status }
 */
router.put(
  '/releases/:releaseId/status',
  authMiddleware,
  updateReleaseStatusController,
);

/**
 * @method: PUT
 * @url: /api/releases/:releaseId
 * @params: Params { releaseId }, Body { name, releaseDate, pullRequests }
 */
router.put(
  '/releases/:releaseId',
  authMiddleware,
  updateReleaseInformationController,
);

/**
 * @method: DELETE
 * @url: /api/releases/:releaseId
 * @params: Params { releaseId }
 */
router.delete('/releases/:releaseId', authMiddleware, deleteReleaseController);

export default router;
