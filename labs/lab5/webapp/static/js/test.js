MBAR_TO_inHG = 0.029529983071;
var data = [];

function getDateNow() {
  var d = new Date();
  var date = d.getMonth() + 1 + '/' + d.getDate() + '/' + (d.getFullYear() - 2000);
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return (date + " " + time);
}

updateSensors = (function() {
  var t_c = 25.0 + Math.random();
  var t_f = (t_c * 9) / 5.0 + 32;
  var p_mbar = 1013.3 + Math.random();
  var p_inHg = p_mbar * MBAR_TO_inHG;

  var d = getDateNow();
  var t = t_c.toFixed(1) + '|' + t_f.toFixed(1);
  var p = p_mbar.toFixed(1) + '|' + p_inHg.toFixed(2);

  var obj = {};
  obj['date'] = d;
  obj['temp'] = t;
  obj['press'] = p;
  data.push(obj);

  console.log(data);
  if (data.length > 3) {
    data.shift();
  }

  clearTable();
  updateTable(data);
});

function updateTable(data) {
  console.log("Inside updatetable(data)");
  $('tr.param-row').each(function(i) {
    var tm = '<td>' + data[i]['date'] + '</td>';
    var temp = '<td>' + data[i]['temp'] + '</td>';
    var press = '<td>' + data[i]['press'] + '</td>';
    $(this).append(tm);
    $(this).append(temp);
    $(this).append(press);
  });
}

function clearTable() {
    console.log("Inside clearTable()");
  $('tr.param-row').each(function(i) {
    $(this).empty();
  });
}

// setInterval(updateSensors, 3000);