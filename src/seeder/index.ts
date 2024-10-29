import { PrismaClient, Prisma } from "@prisma/client";
import mushroomsData from "./data/mushrooms.json";
import { MushroomData, IdMap } from "./types";

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log("🧹 Cleaning database...");

    // Delete in reverse order of dependencies
    await prisma.mushroomDetail.deleteMany();
    await prisma.mushroom.deleteMany();
    await prisma.mushroomFamily.deleteMany();
    await prisma.edibilityCategory.deleteMany();

    console.log("✅ Database cleaned");
  } catch (error) {
    console.error("❌ Error cleaning database:", error);
    throw error;
  }
}

async function seedFamilies(): Promise<Map<string, string>> {
  try {
    console.log("🌱 Seeding mushroom families...");

    const uniqueFamilies = Array.from(
      new Set(mushroomsData.map((mushroom: MushroomData) => mushroom.family))
    );

    const familyMap = new Map<string, string>();

    for (const familyName of uniqueFamilies) {
      const createdFamily = await prisma.mushroomFamily.create({
        data: {
          familyName,
        },
        select: {
          id: true,
        },
      });

      familyMap.set(familyName, createdFamily.id);
    }

    console.log(`✅ Seeded ${uniqueFamilies.length} families`);
    return familyMap;
  } catch (error) {
    console.error("❌ Error seeding families:", error);
    throw error;
  }
}

async function seedEdibilityCategories(): Promise<Map<string, string>> {
  try {
    console.log("🌱 Seeding edibility categories...");

    const edibilityDescriptions: { [key: string]: string } = {
      "Edible and Choice":
        "High-quality edible mushrooms that are prized for their culinary value.",
      Edible: "Safe to eat mushrooms when properly identified and prepared.",
      "Edible when cooked":
        "Mushrooms that are edible only after proper cooking.",
      Poisonous:
        "Contains toxins that can cause illness but usually not fatal.",
      "Deadly Poisonous":
        "Extremely dangerous mushrooms containing lethal toxins.",
    };

    const uniqueEdibilities = Array.from(
      new Set(mushroomsData.map((mushroom: MushroomData) => mushroom.edibility))
    );

    const edibilityMap = new Map<string, string>();

    for (const category of uniqueEdibilities) {
      const createdCategory = await prisma.edibilityCategory.create({
        data: {
          category,
          description:
            edibilityDescriptions[category] || `${category} mushrooms.`,
        },
        select: {
          id: true,
        },
      });

      edibilityMap.set(category, createdCategory.id);
    }

    console.log(`✅ Seeded ${uniqueEdibilities.length} edibility categories`);
    return edibilityMap;
  } catch (error) {
    console.error("❌ Error seeding edibility categories:", error);
    throw error;
  }
}

async function seedMushrooms(
  familyMap: Map<string, string>,
  edibilityMap: Map<string, string>
): Promise<Map<string, string>> {
  try {
    console.log("🌱 Seeding mushrooms...");

    const mushroomMap = new Map<string, string>();

    for (const mushroom of mushroomsData) {
      const familyId = familyMap.get(mushroom.family);
      const edibilityId = edibilityMap.get(mushroom.edibility);

      if (!familyId || !edibilityId) {
        throw new Error(`Missing references for mushroom ${mushroom.name}`);
      }

      const mushroomData: Prisma.MushroomCreateInput = {
        id: mushroom.id,
        name: mushroom.name,
        commonName: mushroom.commonName,
        family: {
          connect: { id: familyId },
        },
        edibilityCategory: {
          connect: { id: edibilityId },
        },
        isEdible: mushroom.isEdible,
        poisonousnessLevel: mushroom.poisonousnessLevel,
        averageHeight: mushroom.averageHeight,
        shortDescription: mushroom.shortDescription,
        imageUrl: mushroom.imageUrl,
      };

      const createdMushroom = await prisma.mushroom.create({
        data: mushroomData,
      });

      mushroomMap.set(mushroom.id, createdMushroom.id);
    }

    console.log(`✅ Seeded ${mushroomsData.length} mushrooms`);
    return mushroomMap;
  } catch (error) {
    console.error("❌ Error seeding mushrooms:", error);
    throw error;
  }
}

async function seedMushroomDetails(mushroomMap: Map<string, string>) {
  try {
    console.log("🌱 Seeding mushroom details...");

    for (const mushroom of mushroomsData) {
      const detailData: Prisma.MushroomDetailCreateInput = {
        mushroom: {
          connect: { id: mushroom.id },
        },
        longDescription: mushroom.longDescription,
        habitat: mushroom.habitat,
        season: mushroom.season,
        funFact: mushroom.funFact,
      };

      await prisma.mushroomDetail.create({
        data: detailData,
      });
    }

    console.log(`✅ Seeded ${mushroomsData.length} mushroom details`);
  } catch (error) {
    console.error("❌ Error seeding mushroom details:", error);
    throw error;
  }
}

async function seedAll() {
  try {
    console.log("🚀 Starting seeding process...");

    // Clean database
    await cleanDatabase();

    // Seed in order of dependencies
    const familyMap = await seedFamilies();
    const edibilityMap = await seedEdibilityCategories();
    const mushroomMap = await seedMushrooms(familyMap, edibilityMap);
    await seedMushroomDetails(mushroomMap);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// run seeder 🔥
seedAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
