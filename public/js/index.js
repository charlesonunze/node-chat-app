const socket = io();

socket.on('connect', () => {
  console.log(`connected from frontend...`);
});

socket.on('disconnect', () => {
  console.log(`disconnected from frontend...`);
});

// listening for this event from the server
socket.on('newMessage', (Message) => {
  console.log(Message);
});
