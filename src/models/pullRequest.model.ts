import { Schema, model } from 'mongoose';

import type { IPullRequest } from '../interfaces/pullRequest.interface';
import { CheckmarkState } from '../enums/checkmarkState.enum';
import { PRStatus } from '../enums/prStatus.enum';

const pullRequestSchema = new Schema<IPullRequest>(
  {
    ticket: { type: String, required: true },
    github: { type: String, required: true, unique: true },
    developer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    functionality: {
      type: String,
      enum: Object.values(CheckmarkState),
      default: CheckmarkState.Pending,
    },
    solid: {
      type: String,
      enum: Object.values(CheckmarkState),
      default: CheckmarkState.Pending,
    },
    sonarQube: {
      type: String,
      enum: Object.values(CheckmarkState),
      default: CheckmarkState.Pending,
    },
    jestTest: {
      type: String,
      enum: Object.values(CheckmarkState),
      default: CheckmarkState.Pending,
    },
    tdd: {
      type: String,
      enum: Object.values(CheckmarkState),
      default: CheckmarkState.Pending,
    },
    status: {
      type: String,
      enum: Object.values(PRStatus),
      default: PRStatus.Pending,
    },
    issuesFound: { type: Number, default: 0 },
    issues: { type: [String], default: [] },
  },
  { timestamps: true },
);

const PullRequest = model<IPullRequest>('PullRequest', pullRequestSchema);
export default PullRequest;
