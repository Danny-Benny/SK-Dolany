const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// const pool = pgp(
//   "postgres://postgres:Zedobrazkolecko1234@localhost:5432/skdolany"
// );

module.exports = pool;
