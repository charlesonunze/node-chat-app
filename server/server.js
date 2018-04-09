const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const {generateMsg, generateLocationMsg} = require('./utils/generateMsg');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected...`);

  socket.on('disconnect', () => {
    console.log(`client was disconnected...`);
  });

  // socket.emit emits an event to a single connection

  // send welcome message to anyone that connects
  socket.emit('newMessage', generateMsg('Admin', 'Welcome to the chat app!'));

  // send message to previously connected users that a new user just joined
  socket
    .broadcast
    .emit('newMessage', generateMsg('Admin', 'New user joned'));

  // listening for a 'createMessage' event from the client
  socket.on('createMessage', (message, callback) => {
    console.log(message);
    // io.emit emits an event to a every single connection
    io.emit('newMessage', generateMsg(message.from, message.text));

    callback('Got it!'); //optional
  });

  // listening for a 'locationMessage' event from the client
  socket.on('locationMessage', (coords) => {
    console.log(coords);
    // io.emit emits an event to a every single connection
    io.emit('newLocationMessage', generateLocationMsg(coords.from, coords.lat, coords.lng));
  });

});

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
