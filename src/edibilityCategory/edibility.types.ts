import { EdibilityCategory } from "@prisma/client";

export type EdibilityCategoryCreate = Omit<EdibilityCategory, "id">;
export type EdibilityCategoryUpdate = Partial<EdibilityCategory>;

export interface EdibilityCategoryResponse {
  message: String;
  data: EdibilityCategory;
}

export interface EdibilityCategoriesResponse {
  message: String;
  data: EdibilityCategory[];
}

export interface EdibilityCategoryDeleteResponse {
  message: string;
}

export interface CreateEdibilityCategoryRequest {
  category: string;
  description: string;
}

export interface UpdateEdibilityCategoryRequest {
  category?: string;
  description?: string;
}
