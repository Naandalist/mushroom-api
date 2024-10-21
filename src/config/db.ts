import { Pool, QueryResult } from "pg";

// Consider using environment variables for these values
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mushroom_api",
  password: "",
  port: 5432,
});

let isConnected = false;

async function dbQuery(text: string, params: any[]): Promise<QueryResult> {
  if (!isConnected) {
    await testConnection();
  }
  return pool.query(text, params);
}

async function testConnection(): Promise<boolean> {
  if (isConnected) {
    console.log("Already connected to the database");
    return true;
  }

  let client;
  try {
    client = await pool.connect();
    console.log("Successfully connected to the database");
    isConnected = true;
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return false;
  } finally {
    if (client) client.release();
  }
}

async function closePool(): Promise<void> {
  await pool.end();
  console.log("Database pool closed");
}

export { dbQuery, testConnection, closePool };
