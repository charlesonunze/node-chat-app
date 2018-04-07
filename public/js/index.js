const socket = io();

socket.on('connect', () => {
  console.log(`connected from frontend...`);

  // creating an event that the server will listen to
  socket.emit('createMessage', {
    from: 'someUser',
    text: 'message from client'
  });
});

socket.on('disconnect', () => {
  console.log(`disconnected from frontend...`);
});

// listening for this event from the server
socket.on('newMessage', (Message) => {
  console.log(Message);
});
