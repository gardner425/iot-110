/* start executing only after document has loaded */
$(document).ready(function() {
  /* establish global variables for LED status */
  var led1;
  var led2;
  var led3;

  /* intercept the incoming states from SSE */
  iotSource.onmessage = function(e) {
    console.log(e.data);
    var params = e.data.split(' ');
    updateSwitch(params[0]);
    updateLeds(1,params[1]);
    updateLeds(2,params[2]);
    updateLeds(3,params[3]);
  }

  /* update the Switch based on its SSE state monitor */
  function updateSwitch(switchValue) {
    if (switchValue === '1') {
      // $('#switch').text('ON');
      $('#switch').toggleClass('label-default', false);
      $('#switch').toggleClass('label-success', true);
    } else if (switchValue === '0') {
      // $('#switch').text('OFF');
      $('#switch').toggleClass('label-default', true);
      $('#switch').toggleClass('label-success', false);
    }
  }

  /* update the LEDs based on their SSE state monitor */
  function updateLeds(ledNum,ledValue) {
    if (ledNum === 1) {
      if (ledValue === '1') {
        // $('#red_led_label').text('ON');
        led1 = "ON"
        $('#red_led_label').toggleClass('label-default', false);
        $('#red_led_label').toggleClass('label-danger', true);
      } else if (ledValue === '0') {
        // $('#red_led_label').text('OFF');
        led1 = "OFF"
        $('#red_led_label').toggleClass('label-default', true);
        $('#red_led_label').toggleClass('label-danger', false);
      }
    }
    else if (ledNum === 2) {
      if (ledValue === '1') {
        // $('#grn_led_label').text('ON');
        led2 = "ON"
        $('#grn_led_label').toggleClass('label-default', false);
        $('#grn_led_label').toggleClass('label-success', true);
      } else if (ledValue === '0') {
        // $('#grn_led_label').text('OFF');
        led2 = "OFF"
        $('#grn_led_label').toggleClass('label-default', true);
        $('#grn_led_label').toggleClass('label-success', false);
      }
    }
    else if (ledNum === 3) {
      if (ledValue === '1') {
        // $('#blu_led_label').text('ON');
        led3 = "ON"
        $('#blu_led_label').toggleClass('label-default', false);
        $('#blu_led_label').toggleClass('label-primary', true);
      } else if (ledValue === '0') {
        // $('#blu_led_label').text('OFF');
        led3 = "OFF"
        $('#blu_led_label').toggleClass('label-default', true);
        $('#blu_led_label').toggleClass('label-primary', false);
      }
    }
  }

    // The red button click functions run asynchronously in the browser
    $('#red_led_btn').click(function() {
      if (led1 === "OFF") {led1 = "ON";} else {led1 = "OFF";}
      var params = 'led=1&state='+led1;
      console.log('Led Command with params:' + params);
      $.post('/ledcmd', params, function(data, status){
              console.log("Data: " + data + "\nStatus: " + status);
      });
    });
    // The green button click functions run asynchronously in the browser
    $('#grn_led_btn').click(function() {
      if (led2 === "OFF") {led2 = "ON";} else {led2 = "OFF";}
      var params = 'led=2&state='+led2;
      console.log('Led Command with params:' + params);
      $.post('/ledcmd', params, function(data, status){
              console.log("Data: " + data + "\nStatus: " + status);
      });
    });

    // The blue button click functions run asynchronously in the browser
    $('#blu_led_btn').click(function() {
      if (led3 === "OFF") {led3 = "ON";} else {led3 = "OFF";}
      var params = 'led=3&state='+led3;
      console.log('Led Command with params:' + params);
      $.post('/ledcmd', params, function(data, status){
              console.log("Data: " + data + "\nStatus: " + status);
      });
    });

  });
