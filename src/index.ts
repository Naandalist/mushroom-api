import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import edibilityRouter from "./edibilityCategory/edibility.controller";
import mushroomRouter from "./mushroom/mushroom.controller";
import familyRouter from "./mushroomFamily/family.controller";

const app = new Hono();

app.use("/*", cors());
app.use(logger());

// Error handler middleware
app.onError((err, c) => {
  console.error(`Error: ${err}`);
  return c.json(
    {
      error: err.message,
    },
    500
  );
});

const rootResponse = {
  message: "Mushroom API is here 🍄",
  author: "Naandalist",
  endpoints: {
    edibilityCategories: {
      get: "/api/edibility-categories",
      getById: "/api/edibility-categories/:id",
      create: "/api/edibility-categories",
      update: "/api/edibility-categories/:id",
      delete: "/api/edibility-categories/:id",
    },
    mushrooms: {
      get: "/api/mushrooms",
      getById: "/api/mushrooms/:id",
      getByFamily: "/api/mushrooms/by-family/:familyId",
      getByEdibility: "/api/mushrooms/edible/:isEdible",
      create: "/api/mushrooms",
      update: "/api/mushrooms/:id",
      delete: "/api/mushrooms/:id",
    },
    mushroomFamilies: {
      get: "/api/mushroom-families",
      getById: "/api/mushroom-families/:id",
      create: "/api/mushroom-families",
      update: "/api/mushroom-families/:id",
      delete: "/api/mushroom-families/:id",
    },
  },
};

// Root route
app.get("/", (c) => {
  return c.json(rootResponse);
});

// all api routers
app.route("/api/edibility-categories", edibilityRouter);
app.route("/api/mushrooms", mushroomRouter);
app.route("/api/mushroom-families", familyRouter);

export default app;
