const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

// const secretKey = "ABCDEF+c2L7yXeGvUyrPgYsDnWRRC1AYEXAMPLE";

const PORT = process.env.PORT || 3000;
const graphQLEndpoint =
  process.env.API_ENDPOINT || 'http://localhost:4000/graphql';

const axios = require('axios');

const path = require('path');
const public = path.join(__dirname, 'dist');

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

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
    const room = queData.labCode;
    delete queData.labCode;
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation joinQue($queObj: QueCreateData!) {
                joinQue(queObj: $queObj){
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                    requireProf
                  }
                  averageTime
                }
              }
          `,
        variables: {
          queObj: queData,
        },
      },
    })
      .then((res) => {
        io.to(room).emit('updateQue', res.data.data.joinQue);
      })
      .catch((err) => {
        console.log(err.response.data.errors[0]);
      });
  });

  socket.on('leaveQue', (queData) => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation leaveQue($lab_id: ID!, $socketid: String!){
                leaveQue(lab_id: $lab_id, socketid: $socketid){
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                    requireProf
                  }
                  averageTime
                }
              }
          `,
        variables: {
          lab_id: queData.lab_id,
          socketid: socket.id,
        },
      },
    })
      .then((res) => {
        io.to(queData.labCode).emit('updateQue', res.data.data.leaveQue);
      })
      .catch((err) => {
        console.log(err.response.data.errors[0]);
      });
  });

  socket.on('updateQue', (queData) => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              query getQue($lab_id: ID!) {
                getQue(lab_id: $lab_id) {
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                    requireProf
                  }
                  averageTime
                }
              }
          `,
        variables: {
          lab_id: queData.lab_id,
        },
      },
    })
      .then((res) => {
        io.to(queData.labCode).emit('updateQue', res.data.data.getQue);
      })
      .catch((err) => {
        console.log(err.response.data.errors[0]);
      });
  });

  socket.on('startHelp', (recieverData) => {
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation leaveQue($lab_id: ID!, $socketid: String!, $helpingTime: Int){
                leaveQue(lab_id: $lab_id, socketid: $socketid, helpingTime: $helpingTime){
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                  }
                  averageTime
                }
              }
          `,
        variables: {
          lab_id: recieverData.lab_id,
          socketid: recieverData.socketid,
          helpingTime: recieverData.timeDiff,
        },
      },
    })
      .then((res) => {
        io.to(recieverData.labCode).emit('updateQue', res.data.data.leaveQue);
        delete recieverData.lab_id;
        delete recieverData.socketid;
        delete recieverData.labCode;
        delete recieverData.timeDiff;
        socket.broadcast
          .to(recieverData.sendTo)
          .emit('startHelp', recieverData);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  });

  socket.on('startHelper', (helperInfo) => {
    socket.broadcast.to(helperInfo.sendTo).emit('startHelper', helperInfo);
  });

  socket.on('newPrivateMessage', (socketData) => {
    io.to(socketData.reciever).emit('newPrivateMessage', socketData.message);
  });

  socket.on('callStudent', (reciever) => {
    io.to(reciever).emit('newCall');
  });

  socket.on('closeCall', (reciever) => {
    io.to(reciever).emit('closeCall');
  });

  socket.on('updateCodeBlock', (codeData) => {
    socket.broadcast
      .to(codeData.reciever)
      .emit('updateCodeBlock', codeData.code);
  });

  socket.on('stopHelp', (data) => {
    socket.broadcast.to(data.socketid).emit('stopHelp');

    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation stopHelp($priv_id: ID!) {
                stopHelp(priv_id: $priv_id)
              }
          `,
        variables: {
          priv_id: data.priv_id,
        },
      },
    }).catch((err) => {
      console.log(err.response.data.errors[0]);
    });
  });

  socket.on('disconnect', () => {
    let code;
    axios(graphQLEndpoint, {
      method: 'POST',
      data: {
        query: `
              mutation socketMemberLeaveLab($id: String!){
                socketMemberLeaveLab(id: $id){
                  _id
                  code
                }
              }
          `,
        variables: {
          id: socket.id,
        },
      },
    })
      .then((res) => {
        code = res.data.data.socketMemberLeaveLab.code;
        io.to(code).emit('disconnectUser', socket.id);

        axios(graphQLEndpoint, {
          method: 'POST',
          data: {
            query: `
              mutation leaveQue($lab_id: ID!, $socketid: String!){
                leaveQue(lab_id: $lab_id, socketid: $socketid){
                  que {
                    socketid
                    queType
                    title
                    desc
                    createdAt
                  }
                  averageTime
                }
              }
          `,
            variables: {
              lab_id: res.data.data.socketMemberLeaveLab._id,
              socketid: socket.id,
            },
          },
        })
          .then((res) => {
            io.to(code).emit('updateQue', res.data.data.leaveQue);
          })
          .catch(() => {});
      })
      .catch(() => {});
    console.log('Socket Disconnected: ' + socket.id);
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:' + PORT);
});
