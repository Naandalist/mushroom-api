import { PrismaClient, EdibilityCategory } from "@prisma/client";
import {
  EdibilityCategoryCreate,
  EdibilityCategoryUpdate,
} from "./edibility.types";

const prisma = new PrismaClient();

export const findAll = async (): Promise<EdibilityCategory[]> => {
  return prisma.edibilityCategory.findMany();
};

export const findById = async (
  id: string
): Promise<EdibilityCategory | null> => {
  return prisma.edibilityCategory.findUnique({
    where: { id },
  });
};

export const create = async (
  data: EdibilityCategoryCreate
): Promise<EdibilityCategory> => {
  return prisma.edibilityCategory.create({
    data,
  });
};

export const update = async (
  id: string,
  data: EdibilityCategoryUpdate
): Promise<EdibilityCategory> => {
  return prisma.edibilityCategory.update({
    where: { id },
    data,
  });
};

export const remove = async (id: string): Promise<void> => {
  await prisma.edibilityCategory.delete({
    where: { id },
  });
};
