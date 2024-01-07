const express = require("express");
const passport = require("../utils/jwt");
const router = express.Router();

const { findByUsername } = require("../models/User");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await findByUsername(req.user.username);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userProfile = {
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      };

      res.json({ message: "This is a protected route", user: userProfile });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
