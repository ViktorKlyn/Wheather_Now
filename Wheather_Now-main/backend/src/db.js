require("dotenv").config();

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { Pool } = require("pg");

const hasExternalDatabase = Boolean(process.env.DATABASE_URL || process.env.DB_HOST);

let database;
let initialize = async () => {};
let close = async () => {};

if (hasExternalDatabase) {
  database = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  close = () => database.end();
} else {
  const { PGlite } = require("@electric-sql/pglite");
  const dataDirectory = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "Weather Now")
    : process.env.XDG_DATA_HOME
      ? path.join(process.env.XDG_DATA_HOME, "weather-now")
      : path.join(os.homedir(), ".weather-now");
  fs.mkdirSync(dataDirectory, { recursive: true });
  const pglite = new PGlite(path.join(dataDirectory, "weather_now"));
  const schema = fs.readFileSync(
    path.join(__dirname, "..", "database", "schema.sql"),
    "utf8"
  );

  database = pglite;
  initialize = () => pglite.exec(schema);
  close = () => pglite.close();
}

module.exports = Object.assign(database, { initialize, close });
