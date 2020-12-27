const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});
const port = require('../config').socket_port;

io.on('connection', (socket) => {
  console.log('Socket Connection Established with ID :' + socket.id);

  // socket.on('joinRoom', (labid) => {
  //   console.log('Join Room: '+ labid);
  //   socket.join(labid);
  // });

  // socket.on('leaveRoom', (labid) => {
  //   console.log('Leave Room: '+ labid);
  //   socket.leave(labid);
  // });

  socket.on('newMessage', (msg) => {
    console.log(msg.lab_id, msg);
    socket.emit("newMessage", msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log('listening on localhost:' + port);
});
