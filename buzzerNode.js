const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const axios = require("axios");

//const users = require("./routes/api/users");
//const profile = require("./routes/api/profile");
const buzzer = require("./routes/api/buzzer");
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

// Load Equipment model
const Buzzer = require("./models/Buzzer");

//Use these Routes
//app.use("/api/users", users);
//app.use("/api/profile", profile);
app.use("/api/buzzer", buzzer);
//app.use("/api/workouts", workouts);
//app.use("/api/posts", posts);

//Load Input Validation
//const validateBuzzerData = require("../../validation/buzzer");
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
    //call mongo to save the data in the Buzzer table/collection
    const newBuzzerState = new Buzzer({
      equipmentId: board.id,
      state: "down"
    });
    newBuzzerState.save();
    console.log("just posted to Mongo down");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
    //call mongo to save the data in the Buzzer table/collection
    const newBuzzerState = new Buzzer({
      equipmentId: board.id,
      state: "hold"
    });
    newBuzzerState.save();
    console.log("just posted to Mongo on hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
    //call mongo to save the data in the Buzzer table/collection
    const newBuzzerState = new Buzzer({
      equipmentId: board.id,
      state: "up"
    });
    newBuzzerState.save();
    console.log("just posted to Mongo on up");
  });
});
