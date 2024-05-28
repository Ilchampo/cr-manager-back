import type {
  ICreatePullRequestParams,
  IDeletePullRequestParams,
  IUpdatePullRequestInformationParams,
  IUpdatePullRequestStatusParams,
} from '../interfaces/pullRequest.service.interface';
import type { IPullRequest } from '../interfaces/pullRequest.interface';
import PullRequest from '../models/pullRequest.model';

export const createPullRequest = async (
  params: ICreatePullRequestParams,
): Promise<IPullRequest> => {
  try {
    const { ticket, github, developer, reviewers } = params;
    const existingPullRequest = await PullRequest.findOne({ github });
    if (existingPullRequest) {
      throw new Error('GitHub pull request link already exists');
    }
    const pullRequest = new PullRequest({
      ticket,
      github,
      developer,
      reviewers,
    });
    return await pullRequest.save();
  } catch (error) {
    throw new Error(`Error creating pull request: ${error as string}`);
  }
};

export const getPullRequest = async (
  pullRequestId: string,
): Promise<IPullRequest | null> => {
  try {
    return await PullRequest.findById(pullRequestId);
  } catch (error) {
    throw new Error(`Error fetching pull request: ${error as string}`);
  }
};

export const getAllPullRequests = async (): Promise<IPullRequest[]> => {
  try {
    return await PullRequest.find();
  } catch (error) {
    throw new Error(`Error fetching pull requests: ${error as string}`);
  }
};

export const updatePullRequestStatus = async (
  params: IUpdatePullRequestStatusParams,
): Promise<IPullRequest | null> => {
  try {
    const { pullRequestId, status } = params;
    const updatedPullRequest = await PullRequest.findByIdAndUpdate(
      pullRequestId,
      { status },
      { new: true, runValidators: true },
    );
    return updatedPullRequest;
  } catch (error) {
    throw new Error(`Error updating pull request status: ${error as string}`);
  }
};

export const updatePullRequestInformation = async (
  params: IUpdatePullRequestInformationParams,
): Promise<IPullRequest | null> => {
  try {
    const { pullRequestId, ...updateData } = params;
    const updatedPullRequest = await PullRequest.findByIdAndUpdate(
      pullRequestId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedPullRequest;
  } catch (error) {
    throw new Error(
      `Error updating pull request information: ${error as string}`,
    );
  }
};

export const deletePullRequest = async (
  params: IDeletePullRequestParams,
): Promise<IPullRequest | null> => {
  try {
    const { pullRequestId } = params;
    return await PullRequest.findByIdAndDelete(pullRequestId);
  } catch (error) {
    throw new Error(`Error deleting pull request: ${error as string}`);
  }
};
