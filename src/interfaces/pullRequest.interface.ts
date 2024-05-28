import type { Document } from 'mongodb';
import { Types } from 'mongoose';

import type { CheckmarkState } from '../enums/checkmarkState.enum';
import type { PRStatus } from '../enums/prStatus.enum';

export interface IPullRequest extends Document {
  ticket: string;
  github: string;
  developer: Types.ObjectId;
  reviewers: Types.ObjectId[];
  functionality: CheckmarkState;
  solid: CheckmarkState;
  sonarQube: CheckmarkState;
  jestTest: CheckmarkState;
  tdd: CheckmarkState;
  status: PRStatus;
  issuesFound: number;
  issues: string[];
}
