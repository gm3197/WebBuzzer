// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCXXkD7eV5z7mU-mM6IdEL5ELS9I-azC5c",
    authDomain: "my-portfolio-55268.firebaseapp.com",
    databaseURL: "https://my-portfolio-55268.firebaseio.com",
    projectId: "my-portfolio-55268",
    storageBucket: "my-portfolio-55268.appspot.com",
    messagingSenderId: "897895059048"
  };
  firebase.initializeApp(config);

function joinRoom() {
  var roomCode = document.getElementById('joinRoom').value;
  if (roomCode != "") {
    firebase.database().ref('webBuzzer/' + roomCode).once('value', function(data) {
      if (data.val()) {
        window.open('room.html?id=' + roomCode, '_self')
      } else {
        alert('The room code you entered isn\'t valid.')
      }
    })
  } else {
    alert('A 5 digit room code is required.')
  }
}

function createRoom() {
  var roomName = document.getElementById('createRoom').value
  if (roomName != "") {
    var roomCode = generate5digitCode()
    firebase.database().ref('webBuzzer/' + roomCode).set({'name': roomName,mostRecentBuzz:0}, function(err) {
      if (err) {
        alert('An error occured. Try again later.')
      } else {
        window.open('manage.html?id=' + roomCode, '_self')
      }
    })
  } else {
    alert('A valid room name is required.')
  }
}

function generate5digitCode() {
  var roomCode = ""
  while (roomCode.length != 5) {
    roomCode = "" + Math.floor(Math.random()*100000)
  }
  return roomCode;
}
