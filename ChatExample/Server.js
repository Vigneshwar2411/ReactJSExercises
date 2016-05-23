var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/public", express.static(__dirname + '/public'));
// app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('focusText', function(msg){
    io.emit('focusText', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
