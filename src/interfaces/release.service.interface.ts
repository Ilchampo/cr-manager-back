import { Types } from 'mongoose';

import type { ReleaseStatus } from '../enums/releaseStatus.enum';

export interface ICreateReleaseParams {
  name: string;
  releaseDate: Date;
  pullRequests: Types.ObjectId[];
}

export interface IUpdateReleaseStatusParams {
  releaseId: string;
  status: ReleaseStatus;
}

export interface IUpdateReleaseInformationParams {
  releaseId: string;
  name?: string;
  releaseDate?: Date;
  pullRequests?: Types.ObjectId[];
}

export interface IDeleteReleaseParams {
  releaseId: string;
}
