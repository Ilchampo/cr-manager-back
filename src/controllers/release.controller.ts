import { Request, Response } from 'express';

import {
  createRelease,
  getRelease,
  getAllReleases,
  updateReleaseStatus,
  updateReleaseInformation,
  deleteRelease,
} from '../services/release.service';

export const createReleaseController = async (req: Request, res: Response) => {
  try {
    const release = await createRelease(req.body);
    return res.status(201).send(release);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const getReleaseController = async (req: Request, res: Response) => {
  try {
    const release = await getRelease(req.params.releaseId);
    if (!release) {
      return res.status(404).send({ message: 'Release not found' });
    }
    return res.status(200).send(release);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const getAllReleasesController = async (req: Request, res: Response) => {
  try {
    const releases = await getAllReleases();
    return res.status(200).send(releases);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};

export const updateReleaseStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedRelease = await updateReleaseStatus({
      releaseId: req.params.releaseId,
      status: req.body.status,
    });
    if (!updatedRelease) {
      return res.status(404).send({ message: 'Release not found' });
    }
    return res.status(200).send(updatedRelease);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const updateReleaseInformationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedRelease = await updateReleaseInformation({
      releaseId: req.params.releaseId,
      ...req.body,
    });
    if (!updatedRelease) {
      return res.status(404).send({ message: 'Release not found' });
    }
    return res.status(200).send(updatedRelease);
  } catch (error) {
    return res.status(400).send({ message: error as string });
  }
};

export const deleteReleaseController = async (req: Request, res: Response) => {
  try {
    const deletedRelease = await deleteRelease({
      releaseId: req.params.releaseId,
    });
    if (!deletedRelease) {
      return res.status(404).send({ message: 'Release not found' });
    }
    return res.status(200).send(deletedRelease);
  } catch (error) {
    return res.status(500).send({ message: error as string });
  }
};
