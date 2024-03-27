const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const passport = require("passport");
const path = require("path");

//middleware
app.use(cors());
app.use(passport.initialize());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../client/build")));

//ROUTES//
app.use("/auth", require("./routes/auth"));

//dodelat checkovani jwt
app.use("/protected", require("./routes/protected"));
app.use("/news", require("./routes/news"));
app.use("/discussions", require("./routes/discussions"));
app.use("/discussions_posts", require("./routes/discussions_posts"));
app.use("/mailer", require("./routes/mailer"));

const PORT = process.env.NODE_ENV !== "production" ? 5000 : 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
