const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Zedobrazkolecko1234",
  host: "localhost",
  port: 7501,
  database: "skdolany",
});
// const pool = pgp(
//   "postgres://postgres:Zedobrazkolecko1234@localhost:5432/skdolany"
// );

module.exports = pool;
