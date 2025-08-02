const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');

//initiate socket.io and attcged this to our http server
const io = socketIO(server);

app.use(express.static('public'));

const users = new Set();

io.on('connection', socket => {
  console.log('A user is now connected');

  //handle users when they join the chat
  socket.on('join', userName => {
    users.add(userName);
    socket.userName = userName;
    io.emit('userJoined', userName);
    io.emit('usersList', Array.from(users));
  });

  // handle incoming chat messages
  socket.on('sendMessage', ({ message, userName }) => {
    // broadcast message to all connected user
    //    socket.broadcast.emit('messages', chatMessages);
    io.emit('newMessage', { message, userName });
  });

  //handle disconnection
  //   socket.on('disconnect', () => {
  //     console.log('A user is now disconnected');
  //     users.forEach(user => {
  //       if (user === socket.userName) {
  //         users.delete(socket.userName);
  //         io.emit('userLeft', user);
  //         io.emit('usersList', Array.from(users));
  //       }
  //     });
  //   });
  socket.on('disconnect', () => {
    console.log('A user is now disconnected');
    if (socket.userName) {
      users.delete(socket.userName);
      io.emit('userLeft', socket.userName);
      io.emit('usersList', Array.from(users));
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
