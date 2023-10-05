const express = require("express");
const passport = require("../utils/jwt");
const router = express.Router();

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

module.exports = router;
