const socket = io();

socket.on('connect', () => {
  console.log(`connected from frontend...`);
});

socket.on('disconnect', () => {
  console.log(`disconnected from frontend...`);
});

var clear = () => {
  input.value = '';
}
var x = document.getElementById('message-form');

var input = document.querySelector('input[name="message"]');

x.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Client',
    text: input.value
  }, (data) => {
    console.log(data);
  });

  clear();
});
// listening for this event from the server
socket.on('newMessage', (Message) => {
  console.log(Message);
  var li = document.createElement('li');

  li.innerHTML = `${Message.from}: ${Message.text}`;

  if (Message.from === 'Admin') {
    UIkit.notification({message: `${Message.text}!`, status: 'primary', pos: 'bottom-center', timeout: 4000});
  } else if (Message.text === '') {
    clear();
  } else {
    var listUser = document.getElementById('listUser');
    listUser.appendChild(li);
  }

});
