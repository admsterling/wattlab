const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});
const port = require('../config').socket_port;

io.on('connection', (socket) => {
  console.log('Socket Connection Established with ID :' + socket.id);

  socket.on('joinRoom', (labCode) => {
    console.log('Join Room: '+ labCode);
    socket.join(labCode);
  });

  socket.on('leaveRoom', (labCode) => {
    console.log('Leave Room: '+ labCode);
    socket.leave(labCode);
  });

  socket.on('endLab', (labCode) => {
    console.log('Ending Lab: ' + labCode)
    io.to(labCode).emit('endLab');
  });

  socket.on('newGroupMessage', (msg) => {
    io.to(msg.labCode).emit('newGroupMessage', msg);
  });

  socket.on('alertGroup', (msg) => {
    socket.broadcast.to(msg.labCode).emit('newGroupAlert', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log('listening on localhost:' + port);
});
