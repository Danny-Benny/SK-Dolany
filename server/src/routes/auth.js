const express = require("express");
const passport = require("../utils/passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { createUser } = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    res.json(user.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign({ id: user.id }, "abc");
      return res.json(token.rows[0]);
    });
  })(req, res, next);
});

module.exports = router;
