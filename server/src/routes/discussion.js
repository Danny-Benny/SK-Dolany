const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a discussion
router.post("/discussions", async (req, res) => {
  try {
    const { disscussion_title } = req.body;
    const newDisscussion = await pool.query(
      "INSERT INTO discussion (disscussion_title) VALUES($1) RETURNING *",
      [disscussion_title]
    );
  } catch (err) {
    console.error(err.message);
  }
});

//get all discussions
router.get("/discussions", async (req, res) => {
  try {
    const allDiscussions = await pool.query("SELECT * FROM discussion");
    res.json(allDiscussions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a discussion by id
router.get("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newDisscussion = await pool.query(
      "SELECT * FROM discussion WHERE id = $1",
      [id]
    );
    res.json(newDisscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a discussion by id
router.put("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { disscussion_title } = req.body;
    const updateDisscussion = await pool.query(
      "UPDATE discussion SET disscussion_title = $1 WHERE id = $2",
      [disscussion_title, id]
    );
    res.json(updateDisscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a discussion by id
router.delete("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDisscussion = await pool.query(
      "DELETE FROM discussion WHERE id = $1",
      [id]
    );
    res.json(deleteDisscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
