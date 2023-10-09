const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
app.use("/auth", require("./routes/auth"));
app.use("/protected", require("./routes/protected"));
app.use("/news", require("./routes/news"));
app.use("/roster", require("./routes/roster"));
app.use("/discussions", require("./routes/discussions"));
app.use("/discussions_posts", require("./routes/discussions_posts"));
app.use("/seasons_links", require("./routes/seasons_links"));

app.listen(5000, () => {
  console.log("server started on port 5000");
});
