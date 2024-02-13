const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a new
router.post("/news", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNews = await pool.query(
      "INSERT INTO news (title, content) VALUES($1, $2) RETURNING *",
      [title, content]
    );
    res.json(newNews.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a news
router.get("/news", async (req, res) => {
  try {
    const allNews = await pool.query("SELECT * FROM news");
    res.json(allNews.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a new

router.get("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newNews = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
    res.json(newNews.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a new
router.put("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updateNews = await pool.query(
      "UPDATE news SET title = $1, content = $2 WHERE id = $3",
      [title, content, id]
    );
    res.json(updateNews.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a new
router.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNews = await pool.query("DELETE FROM news WHERE id = $1", [id]);
    res.json(deleteNews.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
