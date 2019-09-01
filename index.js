const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
console.log('Example app listening on port 3000!');

app.use(express.static('public'));

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
// WARNING: app.listen will not work with SOCKET.IO!

const port = new SerialPort('/dev/ttyACM0')
const parser = new Readline()

io.sockets.on('connection', function (socket) {// WebSocket Connection
  console.log('a cliMate connected');

  

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

port.pipe(parser)
  parser.on('data', (data) => {

    io.emit('sensor', data); //send sensor-data to client

  });

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

