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
    avgThermistorResistance = 1023 / averageSample - 1; //is this right? need parens
    avgThermistorResistance = seriesResistor / avgThermistorResistance;
    console.log("Average Thermistor resistance: " + avgThermistorResistance);

    //do the Steinhart formula
    var steinhart1 = 0;
    var steinhart2 = steinhart1 + avgThermistorResistance / thermistorNominal; //is this right? need parens
    var steinhart3 = Math.log(steinhart2);
    var steinhart4 = steinhart3 / bCoefficient;
    var steinhart5 = (steinhart4 + 1.0) / (temperatureNominal + 273.15);
    var steinhart6 = 1.0 / steinhart5;
    var celciusTemp = steinhart6 - 273.15;
    var farhenheitTemp = (9 * celciusTemp + 32 * 5) / 5;

    console.log("Average Temperature in Celcius: " + celciusTemp);
    console.log("Average Temperature in Fahrenheit: " + farhenheitTemp);
  });
});
