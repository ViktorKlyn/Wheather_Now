require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "weather_now",
});

async function applySchema() {
  const schemaPath = path.join(__dirname, "..", "database", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(schemaSql);
  console.log("Schema applied successfully.");
}

applySchema()
  .catch((error) => {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    pool.end();
  });
