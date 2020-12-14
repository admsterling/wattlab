var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});