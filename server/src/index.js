const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");

//middleware
app.use(cors());
app.use(passport.initialize());
app.use(express.json()); //req.body

//ROUTES//
app.use("/auth", require("./routes/auth"));
app.use("/protected", require("./routes/protected"));
app.use("/news", require("./routes/news"));
app.use("/roster", require("./routes/roster"));
app.use("/discussions", require("./routes/discussions"));
app.use("/discussions_posts", require("./routes/discussions_posts"));
app.use("/seasons_links", require("./routes/seasons_links"));
app.use("/sponsors", require("./routes/sponsors"));
app.use("/photos", require("./routes/photos"));
app.use("/mailer", require("./routes/mailer"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
