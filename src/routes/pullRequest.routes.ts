import { Router } from 'express';

import {
  createPullRequestController,
  getPullRequestController,
  getAllPullRequestsController,
  updatePullRequestStatusController,
  updatePullRequestInformationController,
  deletePullRequestController,
} from '../controllers/pullRequest.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @method: POST
 * @url: /api/pullRequests
 * @params: Body { ticket, github, developer, reviewers }
 */
router.post('/pullRequests', authMiddleware, createPullRequestController);

/**
 * @method: GET
 * @url: /api/pullRequests
 * @params: None
 */
router.get('/pullRequests', authMiddleware, getAllPullRequestsController);

/**
 * @method: GET
 * @url: /api/pullRequests/:pullRequestId
 * @params: Params { pullRequestId }
 */
router.get(
  '/pullRequests/:pullRequestId',
  authMiddleware,
  getPullRequestController,
);

/**
 * @method: PUT
 * @url: /api/pullRequests/:pullRequestId/status
 * @params: Params { pullRequestId }, Body { status }
 */
router.put(
  '/pullRequests/:pullRequestId/status',
  authMiddleware,
  updatePullRequestStatusController,
);

/**
 * @method: PUT
 * @url: /api/pullRequests/:pullRequestId
 * @params: Params { pullRequestId }, Body { ticket, github, reviewers, functionality, solid, sonarQube, jestTest, tdd, issuesFound, issues }
 */
router.put(
  '/pullRequests/:pullRequestId',
  authMiddleware,
  updatePullRequestInformationController,
);

/**
 * @method: DELETE
 * @url: /api/pullRequests/:pullRequestId
 * @params: Params { pullRequestId }
 */
router.delete(
  '/pullRequests/:pullRequestId',
  authMiddleware,
  deletePullRequestController,
);

export default router;
