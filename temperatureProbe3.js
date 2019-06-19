var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
  var celcius = new five.Sensor({
    pin: "A0",
    freq: 5000
  });

  celcius.on("data", function() {
    console.log(this.value);
  });
});
