const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/forum/posts");

const app = express();
// DB key from Config File
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to mongoose success"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
// Do Thing

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));
