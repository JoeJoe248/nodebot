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
  var temperature = new five.Sensor("A0");

  //var led = new five.Led(3);
  //var value = 0;

  //set interval

  //refactor this so that it produces a value and another fuction does the math and loads

  temperature.on("change", function() {
    //from --> https://www.espruino.com/Thermistors

    /*var analogValue = this.value;
    var ohms = (5600 * analogValue) / (1 - analogValue);
    var A = 0.0012874; //steinhart equation
    var B = 0.00023573;
    var C = 0.000000095052;
    var W = Math.log(ohms);
    var tempCelcius = 1 / (A + W * (B + C * W * W)) - 273.15;

    console.log("analog value: " + analogValue);
    console.log("ohms: " + ohms);
    console.log("temp Celcius Value: " + tempCelcius);
    */

    //old Steinhart methodology
    var analogValue = this.value;
    var thermistorNominal = 10000;
    var temperatureNominal = 25;
    var numSamples = 5;
    var bCoefficient = 3950;
    var seriesResistor = 10000;
    var numSamples = 5;
    var totalSampleSum = 0;
    var averageSample = 0;
    console.log("Temperature analog value is: " + analogValue);

    //average out all of the samples
    for (var i = 0; i < numSamples; i++) {
      totalSampleSum += analogValue;
    }
    console.log("Total Sample Sum reading: " + totalSampleSum);

    averageSample = totalSampleSum / numSamples;
    console.log("Average analog reading: " + averageSample);

    //convert the values to resistance
    var avgThermistorResistance = 0;
    avgThermistorResistance = 1023 / (averageSample - 1); //is this right? need parens
    console.log("avgTermistorResistance: " + avgThermistorResistance);
    var avgThermistorResistance2 = seriesResistor / avgThermistorResistance;
    console.log("Average Thermistor2 resistance: " + avgThermistorResistance2);

    //do the Steinhart formula
    var steinhart1 = 0.0;
    var steinhart2 = steinhart1 + avgThermistorResistance2 / thermistorNominal; //is this right? need parens
    //var steinhart3 = Math.log(steinhart2);
    var steinhart3 = Math.log(steinhart2);
    //var steinhart3 = Math.ln(steinhart2);
    var steinhart4 = steinhart3 / bCoefficient;
    console.log("steinhart4: " + steinhart4);
    var steinhart5 = steinhart4 + 1.0 / (temperatureNominal + 273.15);
    console.log("steinhard5: " + steinhart5);
    var steinhart6 = 1.0 / steinhart5;
    var celciusTemp = steinhart6 - 273.15;
    var farhenheitTemp = (9 * celciusTemp + 32 * 5) / 5;

    console.log("Average Temperature in Celcius: " + celciusTemp);
    console.log("Average Temperature in Fahrenheit: " + farhenheitTemp);

    /*const newCookLogEvent = new CookLog({
      analogReading: analogValue,
      temperatureCelcius: tempCelcius,
      //temperatureFahrenheit: farhenheitTemp,
      deviceId: board.id
    });
    newCookLogEvent.save();
    console.log("just posted to Mongo");
    */

    //console.log(this.celsius + "C", this.farhenheit + "F");
    //led.blink(value);
  });
});
