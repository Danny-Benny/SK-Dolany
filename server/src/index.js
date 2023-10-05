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

app.listen(5000, () => {
  console.log("server started on port 5000");
});
