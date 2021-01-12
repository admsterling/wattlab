const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;
const graphQLEndpoint =
  process.env.API_ENDPOINT || 'http://localhost:4000/graphql';

const axios = require('axios');

const path = require('path');
const public = path.join(__dirname, 'dist');

app.use(express.static(public));
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(express.static(public));

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

  socket.on('joinQue', (queData) => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation joinQue($lab_id: ID!, $socketid: String!){
                joinQue(lab_id: $lab_id, socketid: $socketid)
              }
          `,
        variables: {
          lab_id: queData.lab_id,
          socketid: queData.socketid,
        },
      },
    })
      .then((res) => {
        io.to(queData.labCode).emit('updateQue', res.data.data.joinQue);
      })
      .catch((error) => {
        if (error.response) {
          let errorList = error.response.data.errors;
          for (let i = 0; i < this.errorList.length; i++) {
            console.log(errorList[i].message);
          }
        } else {
          console.log('Error', error.message);
        }
      });
  });

  socket.on('leaveQue', (queData) => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation leaveQue($lab_id: ID!, $socketid: String!){
                leaveQue(lab_id: $lab_id, socketid: $socketid)
              }
          `,
        variables: {
          lab_id: queData.lab_id,
          socketid: queData.socketid,
        },
      },
    })
      .then((res) => {
        io.to(queData.labCode).emit('updateQue', res.data.data.leaveQue);
      })
      .catch((err) => {
        console.log(err.errors[0].message);
      });
  });

  socket.on('updateQue', (queData) => {
    return axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation getFirstInQueAndShift($lab_id: ID!){
                getFirstInQueAndShift(lab_id: $lab_id)
              }
          `,
        variables: {
          lab_id: queData.lab_id,
        },
      },
    })
      .then((res) => {
        io.to(queData.labCode).emit(
          'updateQue',
          res.data.data.getFirstInQueAndShift
        );
      })
      .catch((err) => {
        console.log(err.errors[0].message);
      });
  });

  socket.on('startHelp', (recieverData) => {
    socket.broadcast.to(recieverData.sendTo).emit('startHelp', recieverData);
  });

  socket.on('startHelper', (helperInfo) => {
    socket.broadcast.to(helperInfo.sendTo).emit('startHelper', helperInfo);
  });

  socket.on('newPrivateMessage', (socketData) => {
    io.to(socketData.reciever).emit('newPrivateMessage', socketData.message);
  });

  socket.on('updateCodeBlock', (codeData) => {
    socket.broadcast
      .to(codeData.reciever)
      .emit('updateCodeBlock', codeData.code);
  });

  socket.on('stopHelp', (socketID) => {
    socket.broadcast.to(socketID).emit('stopHelp');
  });

  socket.on('disconnect', () => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation socketMemberLeaveLab($id: String!){
                socketMemberLeaveLab(id: $id){
                  _id
                  code
                  socketIDQue
                }
              }
          `,
        variables: {
          id: socket.id,
        },
      },
    })
      .then((res) => {
        if (
          res.data.data.socketMemberLeaveLab.socketIDQue.includes(socket.id)
        ) {
          const queData = {
            lab_id: res.data.data.socketMemberLeaveLab._id,
            labCode: res.data.data.socketMemberLeaveLab.code,
            socketid: socket.id,
          };
          axios(graphQLEndpoint, {
            method: 'POST',
            data: {
              query: `
              mutation leaveQue($lab_id: ID!, $socketid: String!){
                leaveQue(lab_id: $lab_id, socketid: $socketid)
              }
          `,
              variables: {
                lab_id: queData.lab_id,
                socketid: queData.socketid,
              },
            },
          })
            .then((res) => {
              io.to(queData.labCode).emit('updateQue', res.data.data.leaveQue);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
    console.log('Socket Disconnected: ' + socket.id);
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:' + PORT);
});
