import { MushroomFamily, Mushroom } from "@prisma/client";

// Database operation types
export type MushroomFamilyCreate = Omit<MushroomFamily, "id">;
export type MushroomFamilyUpdate = Partial<MushroomFamily>;

// Relations
export interface MushroomFamilyWithMushrooms extends MushroomFamily {
  mushrooms: Mushroom[];
}

// Request types
export interface CreateMushroomFamilyRequest {
  familyName: string;
}

export interface UpdateMushroomFamilyRequest {
  familyName?: string;
}

// Response types
export interface MushroomFamilyResponse {
  message: String;
  data: MushroomFamilyWithMushrooms;
}

export interface MushroomFamiliesResponse {
  message: String;
  data: MushroomFamilyWithMushrooms[];
}

export interface MushroomFamilyDeleteResponse {
  message: string;
}
