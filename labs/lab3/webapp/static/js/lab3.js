/* start executing only after document has loaded */
$(document).ready(function() {
  /* establish global variables for LED status */
  var led1;
  var led2;
  var led3;

  //var iotSource = new EventSource("{{ url_for('myData') }}");
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
      $('#switch').text('ON');
    } else if (switchValue === '0') {
      $('#switch').text('OFF');
    }
  }

  /* update the LEDs based on their SSE state monitor */
  function updateLeds(ledNum,ledValue) {
    if (ledNum === 1) {
      if (ledValue === '1') {
        $('#red_led_label').text('ON');
        led1 = "ON"
      } else if (ledValue === '0') {
        $('#red_led_label').text('OFF');
        led1 = "OFF"
      }
    }
    else if (ledNum === 2) {
      if (ledValue === '1') {
        $('#grn_led_label').text('ON');
        led2 = "ON"
      } else if (ledValue === '0') {
        $('#grn_led_label').text('OFF');
        led2 = "OFF"
      }
    }
    else if (ledNum === 3) {
      if (ledValue === '1') {
        $('#blu_led_label').text('ON');
        led3 = "ON"
      } else if (ledValue === '0') {
        $('#blu_led_label').text('OFF');
        led3 = "OFF"
      }
    }
  }

  // // Let's read the current LED state
  // function initial_conditions() {
  //   var d = $.Deferred();
  //
  //   setTimeout(function() {
  //     $.get('/leds/1',function(data){
  //       led1 = $.trim(data.split(':')[1]);
  //     });
  //
  //     $.get('/leds/2',function(data){
  //       led2 = $.trim(data.split(':')[1]);
  //     });
  //
  //     $.get('/leds/3',function(data){
  //       led3 = $.trim(data.split(':')[1]);
  //     });
  //
  //     // console.log("Got my data now!");
  //     d.resolve();
  //   }, 500);
  //   return d.done();
  // }
  //
  // // Let's initialize our LED vars to the current LED state "ON"/"OFF"
  // function led_status() {
  //   var d = $.Deferred();
  //
  //   setTimeout(function() {
  //     if (led1 === '0') {led1 =  "OFF"} else {led1 =  "ON"}
  //     if (led2 === '0') {led2 =  "OFF"} else {led2 =  "ON"}
  //     if (led3 === '0') {led3 =  "OFF"} else {led3 =  "ON"}
  //     d.resolve();
  //
  //     console.log("RED:",led1);
  //     console.log("GRN:",led2);
  //     console.log("BLU:",led3);
  //   }, 1000);
  //   return d.promise();
  // }
  //
  // // make sure to intialize synchronously (10ms back to back)
  // initial_conditions().then(led_status);

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

  // code the green and blue buttons the same
  });
