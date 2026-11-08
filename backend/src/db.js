require("dotenv").config();

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { Pool } = require("pg");

const schema = fs.readFileSync(
  path.join(__dirname, "..", "database", "schema.sql"),
  "utf8"
);
const usesExternalDatabase = Boolean(process.env.DATABASE_URL || process.env.DB_HOST);

let database;
let initialize;
let close;

if (usesExternalDatabase) {
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
  initialize = () => database.query(schema);
  close = () => database.end();
} else {
  const { PGlite } = require("@electric-sql/pglite");
  const defaultDataDirectory = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "Weather Now")
    : process.env.XDG_DATA_HOME
      ? path.join(process.env.XDG_DATA_HOME, "weather-now")
      : path.join(os.homedir(), ".weather-now");
  const dataDirectory = path.resolve(
    process.env.PGLITE_DATA_DIR || path.join(defaultDataDirectory, "weather_now_v2")
  );

  fs.mkdirSync(path.dirname(dataDirectory), { recursive: true });

  database = new PGlite(dataDirectory);
  initialize = () => database.exec(schema);
  close = () => database.close();
}

module.exports = Object.assign(database, { initialize, close });
