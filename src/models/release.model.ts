import { Schema, model, Types } from 'mongoose';

import type { IRelease } from '../interfaces/release.interface';
import { ReleaseStatus } from '../enums/releaseStatus.enum';

const releaseSchema = new Schema<IRelease>(
  {
    name: { type: String, required: true, unique: true },
    releaseDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(ReleaseStatus),
      default: ReleaseStatus.Pending,
    },
    pullRequests: [{ type: Types.ObjectId, ref: 'PullRequest' }],
  },
  { timestamps: true },
);

const Release = model<IRelease>('Release', releaseSchema);
export default Release;
