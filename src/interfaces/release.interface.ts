import { Types } from 'mongoose';

import type { ReleaseStatus } from '../enums/releaseStatus.enum';

export interface IRelease extends Document {
  name: string;
  releaseDate: Date;
  status: ReleaseStatus;
  pullRequests: Types.ObjectId[];
}
