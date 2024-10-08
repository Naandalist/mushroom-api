import { Hono } from 'hono'
import { cors } from "hono/cors";
import mushroomsData from "./data/mushrooms.json";

const app = new Hono();

app.use("/*", cors());

// Root route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Mushroom API",
    author: "naandalist",
    endpoints: [
      "/api/mushrooms",
      "/api/mushrooms/:id",
      "/api/mushrooms/search/:query",
    ],
  });
});

// Get all mushrooms
app.get("/api/mushrooms", (c) => {
  const conciseMushrooms = mushroomsData.map((mushroom) => {
    return {
      id: mushroom.id,
      name: mushroom.name,
      commonName: mushroom.commonName,
      family: mushroom.family,
      edibility: mushroom.edibility,
      shortDescription: mushroom.shortDescription,
      habitat: mushroom.habitat,
      season: mushroom.season,
      funFact: mushroom.funFact,
    };
  });
  return c.json(conciseMushrooms);
});

// Get one mushroom by ID
app.get("/api/mushrooms/:id", (c) => {
  const id = c.req.param("id");
  const mushroom = mushroomsData.find((m) => m.id === id);

  if (mushroom) {
    return c.json(mushroom);
  } else {
    return c.json({ error: "Mushroom not found" }, 404);
  }
});

// Search mushrooms by name or common name
app.get("/api/mushrooms/search/:query", (c) => {
  const query = c.req.param("query").toLowerCase();
  const results = mushroomsData.filter(
    (m) =>
      m.name.toLowerCase().includes(query) ||
      m.commonName.toLowerCase().includes(query)
  );

  return c.json(results);
});

export default app;