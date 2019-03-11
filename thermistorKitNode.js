const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const axios = require("axios");

//const users = require("./routes/api/users");
//const profile = require("./routes/api/profile");
//const buzzer = require("./routes/api/buzzer");
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

// Load CookLog model
const CookLog = require("./models/CookLog");

//Use these Routes
//app.use("/api/users", users);
//app.use("/api/profile", profile);
//app.use("/api/buzzer", buzzer);
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

const port = process.env.PORT || 6000;

app.listen(port, () => console.log("server running on port " + port));

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  new five.Thermometer({
    controller: "TINKERKIT",
    pin: "I0"
  }).on("change", function() {
    console.log("F: ", this.fahrenheit);
    console.log("C: ", this.celsius);
  });
});
