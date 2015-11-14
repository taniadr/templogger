var http = require('http');
var express = require('express'),
swig = require ('swig'),
app = express(),
datal;
//var app = express();
var server = http.createServer(app);
var Firebase = require('firebase');
var request = require('request');
var bodyParser = require('body-parser');
var myFireRef = new Firebase("https://templogger.firebaseio.com/Living-Room/temperature");
var socket = require('socket.io')(myFireRef);
//var swig  = require('swig');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
  //    extended: true  }));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
//added res.sendFile(index.html)

app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/index.html');
  res.render('index', {});
});
//tem que ver como passar essa bagaça direito
app.get('/datal', function (req, res) {
  res.render('datal', { datal: datal });
});
var io = require('socket.io')();
io.on('connection', function(socket){
  socket.emit('an event', { some: 'data' });
});
var nsp = io.of('/datal');
io.emit('an event sent to all connected clients');

myFireRef.on('child_added', function(snapshot, prevChildKey) {
    var childData = snapshot.val();
    datajpck = {
      datej:childData.date,
      timej:childData.time
    };
    console.log(datajpck);
    JSON.stringify(datajpck, null, 3); //aki tem q passar a bagaça certinho
  //  io.sockets
    swig.render('datapck/:value', { datapck: datal[ childData.val() ] } );
    //res.render('person', { person: people[req.params.id] });
});

app.listen(process.env.PORT || 8080);
