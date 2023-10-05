const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Zedobrazkolecko1234",
  host: "localhost",
  port: 5432,
  database: "skdolany",
});
// const pool = pgp(
//   "postgres://postgres:Zedobrazkolecko1234@localhost:5432/skdolany"
// );

module.exports = pool;
