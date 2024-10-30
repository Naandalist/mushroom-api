import { EdibilityCategory } from "@prisma/client";
import * as EdibilityRepository from "./edibility.repository";
import {
  EdibilityCategoryCreate,
  EdibilityCategoryUpdate,
} from "./edibility.types";

export const findAll = async (): Promise<EdibilityCategory[]> => {
  return EdibilityRepository.findAll();
};

export const findById = async (
  id: string
): Promise<EdibilityCategory | null> => {
  return EdibilityRepository.findById(id);
};

export const create = async (
  data: EdibilityCategoryCreate
): Promise<EdibilityCategory> => {
  return EdibilityRepository.create(data);
};

export const update = async (
  id: string,
  data: EdibilityCategoryUpdate
): Promise<EdibilityCategory> => {
  return EdibilityRepository.update(id, data);
};

export const remove = async (id: string): Promise<void> => {
  await EdibilityRepository.remove(id);
};
