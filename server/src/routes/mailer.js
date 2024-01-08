const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "abc";

const {
  findByEmail,
  updateResetToken,
  updatePassword,
} = require("../models/User");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "danielbenestest@gmail.com",
    pass: "vdnj twmr njea xizt",
  },
});

//Endpoint for sending email to user with reset link
router.post("/requestResetPassword", async (req, res) => {
  const { email } = req.body;
  const user = await findByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

  await updateResetToken(user.id, resetToken);

  let mailOptions = {
    from: "danielbenes04@gmail.com",
    to: user.email,
    subject: "Resetovaní hesla",
    text: `Pro resetovaní hesla klikněte na tento odkaz: http://yourfrontenddomain/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Email sent: " + info.response);
      res.send("Heslo bylo poslano na email");
    }
  });
});

//Endpoint for resetting password
router.post("/resetPassword", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await findByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await updatePassword(user.id, password);

    res.send("Heslo bylo změněno");
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
