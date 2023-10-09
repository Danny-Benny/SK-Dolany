const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a photos
router.post("/photos", async (req, res) => {
  try {
    const { name, image_url, description, author_id } = req.body;
    const newPhoto = await pool.query(
      "INSERT INTO photos (name, image_url, description, author_id) VALUES($1, $2, $3, $4) RETURNING *",
      [name, image_url, description, author_id]
    );
    res.json(newPhoto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all photos
router.get("/photos", async (req, res) => {
  try {
    const allPhotos = await pool.query("SELECT * FROM photos");
    res.json(allPhotos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a photo by id
router.get("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPhoto = await pool.query("SELECT * FROM photos WHERE id = $1", [
      id,
    ]);
    res.json(newPhoto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a photo by id
router.put("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image_url, description } = req.body;
    const updatePhoto = await pool.query(
      "UPDATE photos SET name = $1, image_url = $2, description = $3 WHERE id = $4",
      [name, image_url, description, id]
    );
    res.json(updatePhoto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a photo by id
router.delete("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePhoto = await pool.query("DELETE FROM photos WHERE id = $1", [
      id,
    ]);
    res.json(deletePhoto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
