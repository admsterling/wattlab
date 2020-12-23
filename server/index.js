const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});
const port = require('../config').socket_port;

io.on('connection', (socket) => {
  console.log("Socket Connection Established with ID :"+ socket.id)
});

http.listen(port, () => {
  console.log('listening on localhost:' + port);
});