const { Led, Board, Button } = require("johnny-five");
const board = new Board();
board.on("ready", onReady);

let button;
let led;

function onReady() {
  //if we don't pass a port to the Led constructor it will us
  //the default port (built-in LED)
  button = new Button(5);
  led = new Led(6);
  button.on("press", () => led.on());
  button.on("release", () => led.off());

  //this will grant access to the led instance
  //from within the REPL that's created
  //when running this program
  board.repl.inject({
    led: led
  });

  led.blink();
}
