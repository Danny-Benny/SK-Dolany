const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// Create a discussion
router.post("/discussions", async (req, res) => {
  try {
    const { topic, role } = req.body;
    // const author_id = req.user.id;
    const author_id = jwt.verify(
      req.headers["x-auth-token"],
      process.env.JWT_SECRET
    ).id;
    const newDiscussion = await pool.query(
      "INSERT INTO discussions (author_id, topic, role) VALUES($1, $2, $3 ) RETURNING *",
      [author_id, topic, role]
    );
    res.json(newDiscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all discussions
router.get("/discussions", async (req, res) => {
  try {
    const allDiscussions = await pool.query(
      "SELECT discussions.*, users.username FROM discussions JOIN users ON discussions.author_id = users.id"
    );
    res.json(allDiscussions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get discussions by discussion id
router.get("/discussions/byDiscussionId/:discussionId", async (req, res) => {
  try {
    const { discussionId } = req.params;
    const discussion = await pool.query(
      "SELECT discussions.*, users.username FROM discussions JOIN users ON discussions.author_id = users.id WHERE discussion_id = $1",
      [discussionId]
    );
    res.json(discussion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get discussions by group ID
router.get("/discussions/byGroupId/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params;
    const discussionsByGroup = await pool.query(
      "SELECT discussions.*, users.username FROM discussions JOIN users ON discussions.author_id = users.id WHERE group_id = $1",
      [groupId]
    );
    res.json(discussionsByGroup.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a discussion by id
router.get("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await pool.query(
      "SELECT discussions.*, users.username FROM discussions JOIN users ON discussions.author_id = users.id WHERE discussion_id = $1",
      [id]
    );
    res.json(discussion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a discussion by id
router.put("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { topic } = req.body;
    const updatedDiscussion = await pool.query(
      "UPDATE discussions SET topic = $1 WHERE discussion_id = $2 RETURNING *",
      [topic, id]
    );
    res.json(updatedDiscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a discussion by id
router.delete("/discussions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDiscussion = await pool.query(
      "DELETE FROM discussions WHERE discussion_id = $1 RETURNING *",
      [id]
    );
    res.json(deletedDiscussion.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
