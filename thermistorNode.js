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

// Load Equipment model
const Buzzer = require("./models/Buzzer");

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

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("server running on port " + port));

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var celcius = new five.Sensor("A0");
  /*var temperature = new five.Sensor({
    controller: "thermistor",
    pin: "A0"
  });*/
  //var led = new five.Led(3);
  //var value = 0;

  celcius.on("change", function() {
    var temp_value = this.value;
    var thermistorNominal = 10000;
    var temperatureNominal = 25;
    var numSamples = 5;
    var bCoefficient = 3950;
    var seriesResistor = 10000;
    var numSamples = 5;
    var totalSampleSum = 0;
    var averageSample = 0;
    console.log("Temperature analog value is: " + temp_value);

    //average out all of the samples
    for (var i = 0; i < numSamples; i++) {
      totalSampleSum = totalSampleSum + temp_value;
    }
    console.log("Total Sample Sum reading: " + totalSampleSum);

    averageSample = totalSampleSum / numSamples;
    console.log("Average analog reading: " + averageSample);

    //convert the values to resistance
    var avgThermistorResistance = 0;
    avgThermistorResistance = 1023 / averageSample - 1;
    avgThermistorResistance = seriesResistor / avgThermistorResistance;
    console.log("Average Thermistor resistance: " + avgThermistorResistance);

    //do the Steinhart formula
    var steinhart1 = 0;
    var steinhart2 = steinhart1 + avgThermistorResistance / thermistorNominal;
    var steinhart3 = Math.log(steinhart2);
    var steinhart4 = steinhart3 / bCoefficient;
    var steinhart5 = (steinhart4 + 1.0) / (temperatureNominal + 273.15);
    var steinhart6 = 1.0 / steinhart5;
    var celciusTemp = steinhart6 - 273.15;
    var farhenheitTemp = (9 * celciusTemp + 32 * 5) / 5;

    console.log("Average Temperature in Celcius: " + celciusTemp);
    console.log("Average Temperature in Fahrenheit: " + farhenheitTemp);

    //console.log(this.celsius + "C", this.farhenheit + "F");
    //led.blink(value);
  });
});
