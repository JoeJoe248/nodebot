const { Led, Board } = require("johnny-five");
const board = new Board();
board.on("ready", onReady);

function onReady() {
  // if we don't pass a port to the Led constructor it will use
  // the default port (built-in LED)
  const led = new Led(6);

  // This will grant access to the led instance
  // from within the REPL that's created when
  // running this program.
  board.repl.inject({
    led: led
  });

  led.blink();
  // run in the REPL led.stop() to make it stop blinking
}
