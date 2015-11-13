
var express = require('express');
var http = require('http');
var Firebase = require('firebase');

var app = express();
var myFireRef = new Firebase("https://templogger.firebaseio.com/Living-Room/temperature");

app.get('/', function (req, res) {
  myFireRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      datapck = {
        datej:childData.date,
        timej:childData.time
      };
      console.log(datapck);
      res.write(JSON.stringify(datapck));
    });
    res.send('end');
  });
  //  res.send('hi');
    //res.end();
});
app.listen(process.env.PORT || 8080);
/*var server = app.listen(8080, function (){
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})

//const PORT = 8080;
