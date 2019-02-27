const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/forum/posts");

const app = express();
// DB key from Config File

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose.connect(
  "mongodb://Sebastian:Champion1@ds031962.mlab.com:31962/devconnector",
  { useNewUrlParser: true }
);

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to mongoose success"))
  .catch(err => console.log(err));

  //Passport middleware
  app.use(passport.initialize());

  //Passport config
  require('./config/passport')(passport);

app.get("/", (req, res) => res.send("Hello!"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
// Do Thing

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));
