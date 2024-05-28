import type {
  ICreateReleaseParams,
  IDeleteReleaseParams,
  IUpdateReleaseInformationParams,
  IUpdateReleaseStatusParams,
} from '../interfaces/release.service.interface';
import type { IRelease } from '../interfaces/release.interface';
import Release from '../models/release.model';

export const createRelease = async (
  params: ICreateReleaseParams,
): Promise<IRelease> => {
  try {
    const { name, releaseDate, pullRequests } = params;
    const existingRelease = await Release.findOne({ name });
    if (existingRelease) {
      throw new Error('Release name already exists');
    }
    const release = new Release({ name, releaseDate, pullRequests });
    return await release.save();
  } catch (error) {
    throw new Error(`Error creating release: ${error as string}`);
  }
};

export const getRelease = async (
  releaseId: string,
): Promise<IRelease | null> => {
  try {
    return await Release.findById(releaseId);
  } catch (error) {
    throw new Error(`Error fetching release: ${error as string}`);
  }
};

export const getAllReleases = async (): Promise<IRelease[]> => {
  try {
    return await Release.find();
  } catch (error) {
    throw new Error(`Error fetching releases: ${error as string}`);
  }
};

export const updateReleaseStatus = async (
  params: IUpdateReleaseStatusParams,
): Promise<IRelease | null> => {
  try {
    const { releaseId, status } = params;
    const updatedRelease = await Release.findByIdAndUpdate(
      releaseId,
      { status },
      { new: true, runValidators: true },
    );
    return updatedRelease;
  } catch (error) {
    throw new Error(`Error updating release status: ${error as string}`);
  }
};

export const updateReleaseInformation = async (
  params: IUpdateReleaseInformationParams,
): Promise<IRelease | null> => {
  try {
    const { releaseId, ...updateData } = params;
    const updatedRelease = await Release.findByIdAndUpdate(
      releaseId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedRelease;
  } catch (error) {
    throw new Error(`Error updating release information: ${error as string}`);
  }
};

export const deleteRelease = async (
  params: IDeleteReleaseParams,
): Promise<IRelease | null> => {
  try {
    const { releaseId } = params;
    return await Release.findByIdAndDelete(releaseId);
  } catch (error) {
    throw new Error(`Error deleting release: ${error as string}`);
  }
};
