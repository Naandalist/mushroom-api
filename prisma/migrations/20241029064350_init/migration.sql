-- CreateTable
CREATE TABLE "mushrooms" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "common_name" VARCHAR(100) NOT NULL,
    "family_id" TEXT NOT NULL,
    "edibility_id" TEXT NOT NULL,
    "is_edible" BOOLEAN NOT NULL,
    "poisonousness_level" INTEGER NOT NULL,
    "average_height" INTEGER NOT NULL,
    "short_description" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "mushrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mushroom_details" (
    "id" TEXT NOT NULL,
    "mushroom_id" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "habitat" VARCHAR(100) NOT NULL,
    "season" VARCHAR(50) NOT NULL,
    "fun_fact" VARCHAR(255) NOT NULL,

    CONSTRAINT "mushroom_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mushroom_families" (
    "id" TEXT NOT NULL,
    "family_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "mushroom_families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edibility_categories" (
    "id" TEXT NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "edibility_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mushroom_details_mushroom_id_key" ON "mushroom_details"("mushroom_id");

-- AddForeignKey
ALTER TABLE "mushrooms" ADD CONSTRAINT "mushrooms_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "mushroom_families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mushrooms" ADD CONSTRAINT "mushrooms_edibility_id_fkey" FOREIGN KEY ("edibility_id") REFERENCES "edibility_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mushroom_details" ADD CONSTRAINT "mushroom_details_mushroom_id_fkey" FOREIGN KEY ("mushroom_id") REFERENCES "mushrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
