const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a season_lin
router.post("/seasons_links", async (req, res) => {
  try {
    const { season_name, link_url } = req.body;
    const newSeasonLink = await pool.query(
      "INSERT INTO season_links (season_name, link_url) VALUES($1, $2) RETURNING *",
      [season_name, link_url]
    );
    res.json(newSeasonLink.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all seasons_links
router.get("/seasons_links", async (req, res) => {
  try {
    const allSeasonsLinks = await pool.query("SELECT * FROM season_links");
    res.json(allSeasonsLinks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a season_link by id
router.get("/seasons_links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newSeasonLink = await pool.query("SELECT * FROM season_links WHERE id = $1", [id]);
    res.json(newSeasonLink.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//fix: zase bacha na XSS s tím link_url
//
//update a season_link by id
router.put("/seasons_links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { season_name, link_url } = req.body;
    const updateSeasonLink = await pool.query("UPDATE season_links SET season_name = $1, link_url = $2 WHERE id = $3", [
      season_name,
      link_url,
      id,
    ]);
    res.json(updateSeasonLink.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a season_link by id
router.delete("/seasons_links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSeasonLink = await pool.query("DELETE FROM season_links WHERE id = $1", [id]);
    res.json(deleteSeasonLink.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
