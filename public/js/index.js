const socket = io();

// client connect
socket.on('connect', () => {
  console.log(`client connected...`);
});
// client disconnect
socket.on('disconnect', () => {
  console.log(`client disconnected...`);
});

const clear = () => {
  input.value = '';
}

const form = document.getElementById('message-form');

const locationButton = document.getElementById('location');

const input = document.querySelector('input[name="message"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // send message to the server
  socket.emit('createMessage', {
    from: 'Client',
    text: input.value
  }, (data) => {
    console.log(data);
  });
  // clear input field
  clear();
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) 
    return UIkit.notification({message: '<span uk-icon=\'icon: warning\'></span> Please turn on your location', status: 'danger', pos: 'top-center', timeout: 4000});
  
  navigator
    .geolocation
    .getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // send message to the server
      socket.emit('locationMessage', {
        from: 'GoogleMaps',
        lat,
        lng
      }, (data) => {
        console.log(data);
      });
    }, () => {
      UIkit.notification({message: '<span uk-icon=\'icon: warning\'></span> Unable to fetch location, please check your location settings', status: 'danger', pos: 'top-center', timeout: 4000});
    });

  // clear input field
  clear();
});

// listening for a 'newMessage' event from the server
socket.on('newMessage', (Message) => {
  console.log(Message);

  var li = document.createElement('li');

  li.innerHTML = `${Message.from}: ${Message.text}`;

  if (Message.from === 'Admin') {
    UIkit.notification({message: `${Message.text} <span uk-icon=\'icon: happy\'></span><span uk-icon=\'icon: happy\'></span><span uk-icon=\'icon: happy\'></span>`, status: 'success', pos: 'bottom-center', timeout: 4000});
  } else if (Message.text === '') {
    clear();
  } else {
    var listUser = document.getElementById('listUser');
    listUser.appendChild(li);
  }

});

// listening for a 'newLocationMessage' event from the server
socket.on('newLocationMessage', (Message) => {
  console.log(Message);
  var a = document.createElement('a');

  a.setAttribute('href', `${Message.url}`);
  a.setAttribute('target', `_blank`);
  a.innerHTML = 'See my location';

  var listUser = document.getElementById('listUser');

  listUser.appendChild(a);
});
