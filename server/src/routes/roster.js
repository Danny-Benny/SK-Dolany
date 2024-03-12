const express = require("express");
const router = express.Router();
const pool = require("../db");

//fix: zase bacha na XSS s tím player_photo_url
//
//post a player to roster
router.post("/roster", async (req, res) => {
  try {
    const { player_name, player_position, jersey_number, player_photo_url } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO roster (player_name, player_position, jersey_number, player_photo_url) VALUES($1, $2, $3, $4) RETURNING *",
      [player_name, player_position, jersey_number, player_photo_url]
    );
    res.json(newPlayer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all players from roster
router.get("/roster", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM roster");
    res.json(allPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a player from roster
router.get("/roster/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPlayer = await pool.query("SELECT * FROM roster WHERE id = $1", [id]);
    res.json(newPlayer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a player from roster
router.put("/roster/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { player_name, player_position, jersey_number, player_photo_url } = req.body;
    const updatePlayer = await pool.query(
      "UPDATE roster SET player_name = $1, player_position = $2, jersey_number = $3, player_photo_url = $4 WHERE id = $5",
      [player_name, player_position, jersey_number, player_photo_url, id]
    );
    res.json(updatePlayer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a player from roster
router.delete("/roster/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlayer = await pool.query("DELETE FROM roster WHERE id = $1", [id]);
    res.json("Player was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
