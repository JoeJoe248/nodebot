const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
//const axios = require("axios");

//const users = require("./routes/api/users");
//const profile = require("./routes/api/profile");
//const button = require("./routes/api/button");
//const workouts = require("./routes/api/workouts");
//const equipment = require("./routes/api/equipment");
//const posts = require("./routes/api/posts");
//const orders = require("./routes/api/orders");

const app = express();

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
//app.use("/api/users", users);
//app.use("/api/profile", profile);
//app.use("/api/button", button);
//app.use("/api/workouts", workouts);
//app.use("/api/posts", posts);

//Load Input Validation
//const validateButtonData = require("../../validation/button");
//app.use("/api/orders", orders);

//serve static assets if in production
/*if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "client", "build", "index.html"));
  });
}*/

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("server running on port " + port));

var five = require("johnny-five"),
  board,
  button;

board = new five.Board();

board.on("ready", function() {
  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(2);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
    //call api and drop data into db--date, state, then device id
    app.post("/addState", (req, res) => {
      //ultimately will validate input with validation
      //const { errors, isValid } = validateButtonData.body;

      // check validaiton

      const newButtonState = new Button({
        state: "down"
      });

      newButtonState.save().then(button => res.json(button));
    });
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
    //call api to drop data
    app.post("/addState", (req, res) => {
      //ultimately will validate input with validation
      //const { errors, isValid } = validateButtonData.body;

      // check validaiton

      const newButtonState = new Button({
        state: "hold"
      });

      newButtonState.save().then(button => res.json(button));
    });
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
    //do nothing
  });
});
