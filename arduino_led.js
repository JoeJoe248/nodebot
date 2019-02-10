var five = require("johnny-five");
var board = new five.Board();

//ready says it is ready to accept commands
board.on("ready", function() {
  var led = new five.Led(6);

  board.repl.inject({
    led: led
  });

  led.blink();
});
