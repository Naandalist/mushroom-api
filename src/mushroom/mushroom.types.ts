import { Prisma } from "@prisma/client";

// Use Prisma's generated types for better type safety
export type MushroomWithRelations = Prisma.MushroomGetPayload<{
  include: {
    family: true;
    edibilityCategory: true;
    details: true;
  };
}>;

// Request types
export interface CreateMushroomRequest {
  name: string;
  commonName: string;
  familyId: string;
  edibilityId: string;
  isEdible: boolean;
  poisonousnessLevel: number;
  averageHeight: number;
  shortDescription: string;
  imageUrl: string;
}

export interface UpdateMushroomRequest {
  name?: string;
  commonName?: string;
  familyId?: string;
  edibilityId?: string;
  isEdible?: boolean;
  poisonousnessLevel?: number;
  averageHeight?: number;
  shortDescription?: string;
  imageUrl?: string;
}

// Response types
export interface MushroomResponse {
  message: String;
  data: MushroomWithRelations;
}

export interface MushroomsResponse {
  message: String;
  data: MushroomWithRelations[];
}

export interface MushroomDeleteResponse {
  message: string;
}

// Query params
export interface MushroomQueryParams {
  familyId?: string;
  isEdible?: boolean;
  minHeight?: number;
  maxHeight?: number;
  poisonousnessLevel?: number;
}
