var express = require('express');
var http = require('http');
var Firebase = require('firebase');
var request = require('request');
var app = express();
var myFireRef = new Firebase("https://templogger.firebaseio.com/Living-Room/temperature");
app.use(express.static('public'));
var swig  = require('swig');

app.get('/', function (req, res) {
  res.end('oi');
});

myFireRef.on('child_added', function(snapshot, prevChildKey) {
    var childData = snapshot.val();
    datapck = {
      datej:childData.date,
      timej:childData.time
    };
    console.log(datapck);
    JSON.stringify(datapck, null, 3);
});

app.listen(process.env.PORT || 8080);
