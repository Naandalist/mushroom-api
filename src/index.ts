import { Hono } from 'hono'
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import dataMushrooms from "./data/mushrooms.json";

const app = new Hono();

app.use("/*", cors());
app.use(logger());

// Root route
app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Mushroom API",
    author: "naandalist",
    endpoints: [
      "/api/mushrooms",
      "/api/mushrooms/:id",
      "/api/mushrooms/search",
    ],
  });
});

// Get all mushrooms
app.get("/api/mushrooms", (c) => {
  const mushrooms = dataMushrooms.map(({ longDescription, ...rest }) => rest);
  return c.json({ status: 200, message: "success", data: mushrooms });
});

// Search mushrooms by name or common name
app.get("/api/mushrooms/search", (c) => {
  const query = c.req.query("q");

  console.log("query: ", query);

  if (!query) {
    return c.json(
      { status: 404, message: "Search query is required", data: [] },
      400
    );
  }

  const lowercaseQuery = query.toLowerCase();
  const mushrooms = dataMushrooms.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.commonName.toLowerCase().includes(lowercaseQuery)
  );

  if (mushrooms.length === 0) {
    return c.json(
      { status: 200, message: "No mushrooms found", data: [] },
      200
    );
  }

  return c.json({ status: 200, message: "success", data: mushrooms });
});

// Get one mushroom by ID
app.get("/api/mushrooms/:id", (c) => {
  const id = c.req.param("id");
  const mushroom = dataMushrooms.find((item) => item.id === id);

  if (!mushroom) {
    return c.json({ error: "Mushroom not found" }, 404);
  }

  return c.json({ status: 200, message: "success", data: mushroom });
});

export default app;