const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected...`);

  // socket.emit emits an event to a single connection

  // send welcome message to anyone that connects
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // send message to previously connected users that a new user just joined
  socket
    .broadcast
    .emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });

  // listening for this event from the client
  socket.on('createMessage', (message) => {
    console.log(message);
    // io.emit emits an event to a every single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log(`client was disconnected...`);
  });
});

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
