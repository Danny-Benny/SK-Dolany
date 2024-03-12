const pool = require("../db");
const bcrypt = require("bcrypt");

async function createUser(username, password, name, surname, email, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return pool.query(
    "INSERT INTO users(username, password, name, surname, email, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
    [username, hashedPassword, name, surname, email, role]
  );
}

async function findByUsername(username) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  } catch (error) {
    throw error;
  }
}

async function findById(id) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  } catch (error) {
    throw error;
  }
}

async function findByEmail(email) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  } catch (error) {
    throw error;
  }
}

async function updateResetToken(id, resetToken) {
  try {
    await pool.query("UPDATE users SET reset_token = $1 WHERE id = $2", [
      resetToken,
      id,
    ]);
  } catch (error) {
    throw error;
  }
}

async function updatePassword(id, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      id,
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  findByUsername,
  findById,
  findByEmail,
  updateResetToken,
  updatePassword,
};
