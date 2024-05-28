import { Request, Response } from 'express';

import {
  createPullRequest,
  getPullRequest,
  getAllPullRequests,
  updatePullRequestStatus,
  updatePullRequestInformation,
  deletePullRequest,
} from '../services/pullRequest.service';

export const createPullRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pullRequest = await createPullRequest(req.body);
    return res.status(201).send(pullRequest);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const getPullRequestController = async (req: Request, res: Response) => {
  try {
    const pullRequest = await getPullRequest(req.params.pullRequestId);
    if (!pullRequest) {
      return res.status(404).send({ message: 'Pull request not found' });
    }
    return res.status(200).send(pullRequest);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const getAllPullRequestsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pullRequests = await getAllPullRequests();
    return res.status(200).send(pullRequests);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const updatePullRequestStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedPullRequest = await updatePullRequestStatus({
      pullRequestId: req.params.pullRequestId,
      status: req.body.status,
    });
    if (!updatedPullRequest) {
      return res.status(404).send({ message: 'Pull request not found' });
    }
    return res.status(200).send(updatedPullRequest);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const updatePullRequestInformationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedPullRequest = await updatePullRequestInformation({
      pullRequestId: req.params.pullRequestId,
      ...req.body,
    });
    if (!updatedPullRequest) {
      return res.status(404).send({ message: 'Pull request not found' });
    }
    return res.status(200).send(updatedPullRequest);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const deletePullRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const deletedPullRequest = await deletePullRequest({
      pullRequestId: req.params.pullRequestId,
    });
    if (!deletedPullRequest) {
      return res.status(404).send({ message: 'Pull request not found' });
    }
    return res.status(200).send(deletedPullRequest);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};
