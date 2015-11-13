var express = require('express');
var http = require('http');
var Firebase = require('firebase');
var request = require('request');
var app = express();
var io = require('socket.io')(express().server);

var myFireRef = new Firebase("https://templogger.firebaseio.com/Living-Room/temperature");
app.use(express.static('public'));
//each time i do a request, it logs datapack
var swig  = require('swig');

app.get('/in', function (req, res) {
  res.render('./index.html', {title: 'Oi'});
  res.end();
})

app.get('/', function (req, res) {
  res.end('end');
});

myFireRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot){
    var childData = childSnapshot.val();
    datapck = {
      datej:childData.date,
      timej:childData.time
    };
    console.log(datapck);
    //{datex: datapck.datej, timex: datapck.timej});
    //res.write(JSON.stringify(datapck, null, 3));
  });
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(process.env.PORT || 8080);
