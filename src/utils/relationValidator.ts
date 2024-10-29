import { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

export const validateRelations = async ({
  familyId,
  edibilityId,
  mushroomId,
}: {
  familyId?: string;
  edibilityId?: string;
  mushroomId?: string;
}) => {
  if (familyId) {
    const family = await prisma.mushroomFamily.findUnique({
      where: { id: familyId },
    });
    if (!family) {
      throw new HTTPException(400, {
        message: `Mushroom family with id ${familyId} not found`,
      });
    }
  }

  if (edibilityId) {
    const edibility = await prisma.edibilityCategory.findUnique({
      where: { id: edibilityId },
    });
    if (!edibility) {
      throw new HTTPException(400, {
        message: `Edibility category with id ${edibilityId} not found`,
      });
    }
  }

  if (mushroomId) {
    const mushroom = await prisma.mushroom.findUnique({
      where: { id: mushroomId },
    });
    if (!mushroom) {
      throw new HTTPException(400, {
        message: `Mushroom with id ${mushroomId} not found`,
      });
    }

    // Check if mushroom already has details
    if (familyId === undefined) {
      // Only check when creating/updating details
      const existingDetails = await prisma.mushroomDetail.findUnique({
        where: { mushroomId },
      });
      if (existingDetails) {
        throw new HTTPException(400, {
          message: `Mushroom ${mushroomId} already has details`,
        });
      }
    }
  }
};
