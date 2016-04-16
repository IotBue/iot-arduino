var five = require("johnny-five");
var board = new five.Board();

var request = require('request');

board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "BMP180",
    freq: 250
  });

  temperature.on("change", function() {
    console.log("temperature");
    console.log("  celsius      : ", this.celsius);
    request.post('http://raspi-api.herokuapp.com/api/raspis/5711ca0c4c42d4110068756d/sensors/5711ca4a4c42d4110068756e/sensors_data', { json: { value:this.celsius, sentAt: Date.now() } }, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("Post to server OK");
      }
    });
  });
});