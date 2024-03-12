const express = require("express");
const passport = require("../utils/passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { createUser } = require("../models/User");
const secretKey = process.env.JWT_SECRET;

// admina by jsi měl vytvářet nějak speciálně pouze TY
router.post("/register", async (req, res) => {
  try {
    const { username, password, name, surname, email, role } = req.body;
    const userRole = role || "public";
    const user = await createUser(
      username,
      password,
      name,
      surname,
      email,
      userRole
    );

    res.json(user.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign({ id: user.id }, secretKey);
      res.json({ token, user });
    });
  })(req, res, next);
});

module.exports = router;
