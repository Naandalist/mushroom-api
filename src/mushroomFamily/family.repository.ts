import { PrismaClient } from "@prisma/client";
import {
  MushroomFamilyCreate,
  MushroomFamilyUpdate,
  MushroomFamilyWithMushrooms,
} from "./family.types";

const prisma = new PrismaClient();

export const findAll = async (): Promise<MushroomFamilyWithMushrooms[]> => {
  return prisma.mushroomFamily.findMany({
    include: {
      mushrooms: true,
    },
  });
};

export const findById = async (
  id: string
): Promise<MushroomFamilyWithMushrooms | null> => {
  return prisma.mushroomFamily.findUnique({
    where: { id },
    include: {
      mushrooms: true,
    },
  });
};

export const create = async (
  data: MushroomFamilyCreate
): Promise<MushroomFamilyWithMushrooms> => {
  return prisma.mushroomFamily.create({
    data,
    include: {
      mushrooms: true,
    },
  });
};

export const update = async (
  id: string,
  data: MushroomFamilyUpdate
): Promise<MushroomFamilyWithMushrooms> => {
  return prisma.mushroomFamily.update({
    where: { id },
    data,
    include: {
      mushrooms: true,
    },
  });
};

export const remove = async (id: string): Promise<void> => {
  await prisma.mushroomFamily.delete({
    where: { id },
  });
};
