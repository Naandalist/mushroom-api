export interface MushroomData {
  id: string;
  name: string;
  commonName: string;
  family: string;
  edibility: string;
  isEdible: boolean;
  poisonousnessLevel: number;
  averageHeight: number;
  shortDescription: string;
  longDescription: string;
  habitat: string;
  season: string;
  funFact: string;
  imageUrl: string;
}

// Updated to use string IDs throughout
export interface IdMap {
  familyMap: Map<string, string>;
  edibilityMap: Map<string, string>;
  mushroomMap: Map<string, string>;
}
