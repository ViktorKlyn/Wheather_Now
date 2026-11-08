require("dotenv").config();

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { Pool } = require("pg");

const schema = fs.readFileSync(
  path.join(__dirname, "..", "database", "schema.sql"),
  "utf8"
);
const databaseDriver = process.env.DB_DRIVER || "postgres";

let database;
let initializeDatabase;
let close;
let demoUserId;

if (databaseDriver === "postgres") {
  database = new Pool(
    process.env.DATABASE_URL
      ? { connectionString: process.env.DATABASE_URL }
      : {
          host: process.env.DB_HOST || "localhost",
          port: Number(process.env.DB_PORT || 5432),
          user: process.env.DB_USER || "postgres",
          password: process.env.DB_PASSWORD || "postgres",
          database: process.env.DB_NAME || "weather_now",
        }
  );
  initializeDatabase = async () => {
    await database.query(schema);
    const result = await database.query(
      "SELECT id FROM usuarios WHERE codigo = $1",
      ["weather_now_demo"]
    );
    if (result.rows.length !== 1) {
      throw new Error("Não foi possível localizar a usuária de demonstração no PostgreSQL.");
    }
    demoUserId = Number(result.rows[0].id);
  };
  close = () => database.end();
} else if (databaseDriver === "pglite") {
  const { PGlite } = require("@electric-sql/pglite");
  const defaultDataDirectory = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "Weather Now")
    : process.env.XDG_DATA_HOME
      ? path.join(process.env.XDG_DATA_HOME, "weather-now")
      : path.join(os.homedir(), ".weather-now");
  const configuredDataDirectory =
    process.env.PGLITE_DATA_DIR || path.join(defaultDataDirectory, "weather_now_v2");
  if (configuredDataDirectory === ":memory:") {
    database = new PGlite();
  } else {
    const dataDirectory = path.resolve(configuredDataDirectory);
    fs.mkdirSync(path.dirname(dataDirectory), { recursive: true });
    database = new PGlite(dataDirectory);
  }
  initializeDatabase = async () => {
    await database.exec(schema);
    const result = await database.query(
      "SELECT id FROM usuarios WHERE codigo = $1",
      ["weather_now_demo"]
    );
    if (result.rows.length !== 1) {
      throw new Error("Não foi possível localizar a usuária de demonstração no PGlite.");
    }
    demoUserId = Number(result.rows[0].id);
  };
  close = () => database.close();
} else {
  throw new Error(`DB_DRIVER inválido: ${databaseDriver}. Use postgres ou pglite.`);
}

async function getDemoUserId() {
  if (!demoUserId) {
    throw new Error("O banco ainda não foi inicializado.");
  }
  return demoUserId;
}

module.exports = {
  query: (...args) => database.query(...args),
  initialize: initializeDatabase,
  close,
  getDemoUserId,
};
