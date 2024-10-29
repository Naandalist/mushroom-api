import { PrismaClient } from "@prisma/client";
import mushroomsData from "./data/mushrooms.json";
import { MushroomData } from "./types";

const prisma = new PrismaClient();

export async function seedMushroomFamilies() {
  try {
    console.log("🌱 Seeding mushroom families...");

    // Extract unique families
    const uniqueFamilies = Array.from(
      new Set(mushroomsData.map((mushroom: MushroomData) => mushroom.family))
    );

    // Create or update for each family
    for (const familyName of uniqueFamilies) {
      await prisma.mushroomFamily.upsert({
        where: {
          id: familyName.toLowerCase().replace(/\s+/g, "_"),
        },
        update: {
          familyName: familyName,
        },
        create: {
          id: familyName.toLowerCase().replace(/\s+/g, "_"),
          familyName: familyName,
        },
      });
    }

    console.log("✅ Mushroom families seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding mushroom families:", error);
    throw error;
  }
}
