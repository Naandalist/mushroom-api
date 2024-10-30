import { PrismaClient, Mushroom } from "@prisma/client";
import type { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Define the include type for consistent usage
const defaultIncludes = {
  family: true,
  edibilityCategory: true,
  details: true,
} satisfies Prisma.MushroomInclude;

// Use Prisma generated types for proper typing of relations
type MushroomWithRelations = Prisma.MushroomGetPayload<{
  include: typeof defaultIncludes;
}>;

export const findAll = async (): Promise<MushroomWithRelations[]> => {
  return prisma.mushroom.findMany({
    include: defaultIncludes,
  });
};

export const findById = async (
  id: string
): Promise<MushroomWithRelations | null> => {
  return prisma.mushroom.findUnique({
    where: { id },
    include: defaultIncludes,
  });
};

export const create = async (
  data: Prisma.MushroomCreateInput
): Promise<MushroomWithRelations> => {
  return prisma.mushroom.create({
    data,
    include: defaultIncludes,
  });
};

export const update = async (
  id: string,
  data: Prisma.MushroomUpdateInput
): Promise<MushroomWithRelations> => {
  return prisma.mushroom.update({
    where: { id },
    data,
    include: defaultIncludes,
  });
};

export const remove = async (id: string): Promise<void> => {
  await prisma.mushroom.delete({
    where: { id },
  });
};

export const removeDetails = async (mushroomId: string): Promise<void> => {
  await prisma.mushroomDetail.delete({
    where: { mushroomId },
  });
};

export const createWithDetails = async (
  mushroomData: Prisma.MushroomCreateInput,
  detailsData: Prisma.MushroomDetailCreateInput
): Promise<MushroomWithRelations> => {
  return prisma.$transaction(async (tx) => {
    const mushroom = await tx.mushroom.create({
      data: mushroomData,
      include: defaultIncludes,
    });

    if (detailsData) {
      await tx.mushroomDetail.create({
        data: {
          ...detailsData,
          mushroom: {
            connect: { id: mushroom.id },
          },
        },
      });
    }

    return findById(mushroom.id) as Promise<MushroomWithRelations>;
  });
};

export const findByFamily = async (
  familyId: string
): Promise<MushroomWithRelations[]> => {
  return prisma.mushroom.findMany({
    where: { familyId },
    include: defaultIncludes,
  });
};

export const findByEdibility = async (
  isEdible: boolean
): Promise<MushroomWithRelations[]> => {
  return prisma.mushroom.findMany({
    where: { isEdible },
    include: defaultIncludes,
  });
};
