const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});
const port = require('../config').socket_port;
const axios = require('axios');

io.on('connection', (socket) => {
  console.log('Socket Connection Established with ID :' + socket.id);

  socket.on('joinRoom', (labCode) => {
    console.log('Join Room: ' + labCode);
    socket.join(labCode);
  });

  socket.on('leaveRoom', (labCode) => {
    console.log('Leave Room: ' + labCode);
    socket.leave(labCode);
  });

  socket.on('endLab', (labCode) => {
    console.log('Ending Lab: ' + labCode);
    io.to(labCode).emit('endLab');
  });

  socket.on('newGroupMessage', (msg) => {
    io.to(msg.labCode).emit('newGroupMessage', msg);
  });

  socket.on('alertGroup', (msg) => {
    socket.broadcast.to(msg.labCode).emit('newGroupAlert', msg);
  });

  socket.on('codeChange', (code) => {
    console.log(code);
  });

  socket.on('disconnect', (data) => {
    axios('http://localhost:4000/graphql', {
      method: 'POST',
      data: {
        query: `
              mutation socketMemberLeaveLab($id: String!){
                socketMemberLeaveLab(id: $id)
              }
          `,
        variables: {
          id: socket.id,
        },
      },
    }).catch(() => {});
    console.log('Socket Disconnected: ' + socket.id);
  });
});

http.listen(port, () => {
  console.log('listening on localhost:' + port);
});
