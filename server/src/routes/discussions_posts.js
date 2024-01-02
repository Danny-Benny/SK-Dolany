const express = require("express");
const router = express.Router();
const pool = require("../db");

//post a discussion_post
router.post("/discussions_posts", async (req, res) => {
  try {
    const { content } = req.body;
    const author_id = jwt.verify(req.headers["x-auth-token"], "abc").id;
    const newDisscussionPost = await pool.query(
      "INSERT INTO discussion_posts (discussion_id, author_id, content) VALUES($1, $2, $3) RETURNING *",
      [req.body.discussion_id, author_id, content]
    );
    res.json(newDisscussionPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all discussions_posts
router.get("/discussions_posts", async (req, res) => {
  try {
    const allDiscussionsPosts = await pool.query(
      "SELECT * FROM discussion_posts"
    );
    res.json(allDiscussionsPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all discussions_posts by discussion_id
router.get(
  "/discussions_posts/byDiscussionId/:discussion_id",
  async (req, res) => {
    try {
      const { discussion_id } = req.params;
      const discussionsPostsByDiscussion = await pool.query(
        "SELECT * FROM discussion_posts WHERE discussion_id = $1",
        [discussion_id]
      );
      res.json(discussionsPostsByDiscussion.rows);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//get a discussion_post by id
router.get("/discussions_posts/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const newDisscussionPost = await pool.query(
      "SELECT * FROM discussion_posts WHERE post_id = $1",
      [post_id]
    );
    res.json(newDisscussionPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a discussion_post by id
// router.put("/discussions_posts/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { discussion_id, author_id, post_text } = req.body;
//     const updateDisscussionPost = await pool.query(
//       "UPDATE discussion_posts SET discussion_id = $1, author_id = $2, post_text = $3 WHERE id = $4",
//       [discussion_id, author_id, post_text, id]
//     );
//     res.json(updateDisscussionPost.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//delete a discussion_post by id
router.delete("/discussions_posts/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    const deleteDisscussionPost = await pool.query(
      "DELETE FROM discussion_posts WHERE post_id = $1",
      [post_id]
    );
    res.json(deleteDisscussionPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
