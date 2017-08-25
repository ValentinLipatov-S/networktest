'use strict';
/*
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('message', (data) => {
     io.emit('message', data);
  })
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
*/
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var path = require('path');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('beep', function(){
        socket.emit("speed", {data: 5});
        console.log('beep recieved');
    });

    socket.on('change-speed', function(data) {
        console.log('change speed recieved: ' + data);
        socket.emit("speed", {newSpeed: data});
    });

    socket.on('ios-connection', function(data) {
        console.log('ios connection with message: ' + data);
    });

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
