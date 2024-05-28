import { Types } from 'mongoose';

import type { CheckmarkState } from '../enums/checkmarkState.enum';
import type { PRStatus } from '../enums/prStatus.enum';

export interface ICreatePullRequestParams {
  ticket: string;
  github: string;
  developer: Types.ObjectId;
  reviewers: Types.ObjectId[];
}

export interface IUpdatePullRequestStatusParams {
  pullRequestId: string;
  status: PRStatus;
}

export interface IUpdatePullRequestInformationParams {
  pullRequestId: string;
  ticket?: string;
  github?: string;
  reviewers?: Types.ObjectId[];
  functionality?: CheckmarkState;
  solid?: CheckmarkState;
  sonarQube?: CheckmarkState;
  jestTest?: CheckmarkState;
  tdd?: CheckmarkState;
  issuesFound?: number;
  issues?: string[];
}

export interface IDeletePullRequestParams {
  pullRequestId: string;
}
