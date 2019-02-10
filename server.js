const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
//const buttons = require("./routes/api/buttons");
const cookLog = require("./routes/api/cookLog");
const recipes = require("./routes/api/recipes");
const posts = require("./routes/api/posts");
//const orders = require("./routes/api/orders");

const app = express();
//test this
app.get("/", (req, res) => res.send("Hello World.."));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys/keys_dev").mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// passport middlewear
app.use(passport.initialize());

//passport config passport has a strategy
//require("./config/passport")(passport);

//Use these Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
//app.use("/api/buttons", buttons);
app.use("/api/cookLog", cookLog);
app.use("/api/recipes", recipes);
app.use("/api/posts", posts);
//app.use("/api/orders", orders);

//serve static assets if in production
/*if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "client", "build", "index.html"));
  });
}*/

//when we deploy to Heroku you need process.env.PORT
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on part ${port}`));
