const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a sponsor
router.post("/sponsors", async (req, res) => {
  try {
    const { company_logo_url } = req.body;
    const newSponsor = await pool.query(
      "INSERT INTO sponsors (company_logo_url) VALUES($1) RETURNING *",
      [company_logo_url]
    );
    res.json(newSponsor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all sponsors
router.get("/sponsors", async (req, res) => {
  try {
    const allSponsors = await pool.query("SELECT * FROM sponsors");
    res.json(allSponsors.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a sponsor by id
router.get("/sponsors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newSponsor = await pool.query(
      "SELECT * FROM sponsors WHERE id = $1",
      [id]
    );
    res.json(newSponsor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a sponsor by id
router.put("/sponsors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company_logo_url } = req.body;
    const updateSponsor = await pool.query(
      "UPDATE sponsors SET company_logo_url = $1 WHERE id = $2",
      [company_logo_url, id]
    );
    res.json(updateSponsor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a sponsor by id
router.delete("/sponsors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSponsor = await pool.query(
      "DELETE FROM sponsors WHERE id = $1",
      [id]
    );
    res.json(deleteSponsor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
