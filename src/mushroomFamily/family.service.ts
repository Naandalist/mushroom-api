import * as FamilyRepository from "./family.repository";
import {
  MushroomFamilyWithMushrooms,
  CreateMushroomFamilyRequest,
  UpdateMushroomFamilyRequest,
} from "./family.types";

export const findAll = async (): Promise<MushroomFamilyWithMushrooms[]> => {
  return FamilyRepository.findAll();
};

export const findById = async (
  id: string
): Promise<MushroomFamilyWithMushrooms | null> => {
  return FamilyRepository.findById(id);
};

export const create = async (
  data: CreateMushroomFamilyRequest
): Promise<MushroomFamilyWithMushrooms> => {
  return FamilyRepository.create(data);
};

export const update = async (
  id: string,
  data: UpdateMushroomFamilyRequest
): Promise<MushroomFamilyWithMushrooms> => {
  return FamilyRepository.update(id, data);
};

export const remove = async (id: string): Promise<void> => {
  await FamilyRepository.remove(id);
};
