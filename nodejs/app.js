var express = require('express');
var http = require('http');
var Firebase = require('firebase');
var request = require('request');

var app = express();
var myFireRef = new Firebase("https://templogger.firebaseio.com/Living-Room/temperature");

//each time i do a request, it logs datapack
app.get('/', function (req, res) {

  myFireRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      datapck = {
        datej:childData.date,
        timej:childData.time
      };
      console.log(datapck);
      res.write(JSON.stringify(datapck, null, 3));
    });
    res.end('end');
  });
});
app.listen(process.env.PORT || 8080);
