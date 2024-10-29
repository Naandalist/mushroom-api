import * as MushroomRepository from "./mushroom.repository";
import { validateRelations } from "../utils/relationValidator";
import {
  MushroomWithRelations,
  CreateMushroomRequest,
  UpdateMushroomRequest,
} from "./mushroom.types";
import { HTTPException } from "hono/http-exception";
import type { Prisma } from "@prisma/client";

export const findAll = async (): Promise<MushroomWithRelations[]> => {
  return MushroomRepository.findAll();
};

export const findById = async (
  id: string
): Promise<MushroomWithRelations | null> => {
  return MushroomRepository.findById(id);
};

// findByFamily
export const findByFamily = async (
  familyId: string
): Promise<MushroomWithRelations[]> => {
  // Validate that family exists
  await validateRelations({ familyId });
  return MushroomRepository.findByFamily(familyId);
};

// findByEdibility
export const findByEdibility = async (
  isEdible: boolean
): Promise<MushroomWithRelations[]> => {
  return MushroomRepository.findByEdibility(isEdible);
};

export const create = async (
  data: CreateMushroomRequest
): Promise<MushroomWithRelations> => {
  await validateRelations({
    familyId: data.familyId,
    edibilityId: data.edibilityId,
  });

  const prismaData: Prisma.MushroomCreateInput = {
    name: data.name,
    commonName: data.commonName,
    poisonousnessLevel: Number(data.poisonousnessLevel),
    averageHeight: Number(data.averageHeight),
    isEdible: Boolean(data.isEdible),
    shortDescription: data.shortDescription,
    imageUrl: data.imageUrl,
    family: {
      connect: { id: data.familyId },
    },
    edibilityCategory: {
      connect: { id: data.edibilityId },
    },
  };

  return MushroomRepository.create(prismaData);
};

export const update = async (
  id: string,
  data: UpdateMushroomRequest
): Promise<MushroomWithRelations> => {
  if (data.familyId || data.edibilityId) {
    await validateRelations({
      familyId: data.familyId,
      edibilityId: data.edibilityId,
    });
  }

  const prismaData: Prisma.MushroomUpdateInput = {
    ...(data.name && { name: data.name }),
    ...(data.commonName && { commonName: data.commonName }),
    ...(data.poisonousnessLevel && {
      poisonousnessLevel: Number(data.poisonousnessLevel),
    }),
    ...(data.averageHeight && { averageHeight: Number(data.averageHeight) }),
    ...(data.isEdible !== undefined && { isEdible: Boolean(data.isEdible) }),
    ...(data.shortDescription && { shortDescription: data.shortDescription }),
    ...(data.imageUrl && { imageUrl: data.imageUrl }),
    ...(data.familyId && {
      family: { connect: { id: data.familyId } },
    }),
    ...(data.edibilityId && {
      edibilityCategory: { connect: { id: data.edibilityId } },
    }),
  };

  return MushroomRepository.update(id, prismaData);
};

export const remove = async (id: string): Promise<void> => {
  const mushroom = await MushroomRepository.findById(id);
  if (!mushroom) {
    throw new HTTPException(404, {
      message: `Mushroom with id ${id} not found`,
    });
  }

  if (mushroom.details) {
    await MushroomRepository.removeDetails(id);
  }

  await MushroomRepository.remove(id);
};
