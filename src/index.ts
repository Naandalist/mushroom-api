import { Hono } from 'hono'
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { testConnection, dbQuery, closePool } from "./config/db";

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
app.get("/api/mushrooms", async (c) => {
  try {
    const result = await dbQuery(
      'SELECT id, name, "commonName" FROM mushrooms',
      []
    );
    return c.json({ status: 200, message: "success", data: result.rows });
  } catch (error) {
    console.error("Database query error:", error);
    return c.json(
      { status: 500, message: "Internal server error", data: [] },
      500
    );
  }
});

// Search mushrooms by name or common name
app.get("/api/mushrooms/search", async (c) => {
  const searchQuery = c.req.query("q");

  if (!searchQuery) {
    return c.json(
      { status: 400, message: "Search query is required", data: [] },
      400
    );
  }

  try {
    const result = await dbQuery(
      'SELECT * FROM mushrooms WHERE LOWER(name) LIKE $1 OR LOWER("commonName") LIKE $1',
      [`%${searchQuery.toLowerCase()}%`]
    );

    if (result.rows.length === 0) {
      return c.json(
        { status: 200, message: "No mushrooms found", data: [] },
        200
      );
    }

    return c.json({ status: 200, message: "success", data: result.rows });
  } catch (error) {
    console.error("Database query error:", error);
    return c.json(
      { status: 500, message: "Internal server error", data: [] },
      500
    );
  }
});

// Get one mushroom by ID
app.get("/api/mushrooms/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const result = await dbQuery("SELECT * FROM mushrooms WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return c.json(
        { status: 404, message: "Mushroom not found", data: null },
        404
      );
    }

    return c.json({ status: 200, message: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Database query error:", error);
    return c.json(
      { status: 500, message: "Internal server error", data: null },
      500
    );
  }
});

async function startServer() {
  try {
    await testConnection();
  } catch (error) {
    console.error("Failed to connect to the database. Exiting.", error);
    process.exit(1);
  }
}

// Proper shutdown handling
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully");
  await closePool();
  process.exit(0);
});

startServer();

export default app;