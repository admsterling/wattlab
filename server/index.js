const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = require("../config").socket_port;

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log("listening on localhost:" + port);
});