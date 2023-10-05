const pool = require("../db");
const bcrypt = require("bcrypt");

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return pool.query(
    "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
    [username, hashedPassword]
  );
}

async function findByUsername(username) {
  return pool.query("SELECT * FROM users WHERE username = $1", username);
}

module.exports = { createUser, findByUsername };
