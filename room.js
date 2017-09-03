// Initialize Firebase
// You should add your firebase initialization data here.

var nameNumber = 0

if (QueryString().id != null) {
  var room = firebase.database().ref('webBuzzer/' + QueryString().id)
  room.child('name').once('value', function(name) {
    document.getElementById('title').innerHTML = "Web Buzzer <br> " + name.val()
  })

} else {
  window.open('index.html', '_self')
}

function buzz() {
  firebase.database().ref('webBuzzer/' + QueryString().id + '/mostRecentBuzz').set(nameNumber)
}

function saveName() {
  var name = document.getElementById('name').value;
  if (name != "") {
    var num = generate5digitCode()
    firebase.database().ref('webBuzzer/' + QueryString().id + '/people/' + num).set(name, function(err) {
      if (err) {
        alert('An error occured. Try again later.')
      } else {
        nameNumber = num
        document.getElementById('mainSection').innerHTML = "<button class=\"buzzer\" onclick=\"buzz()\"></button>"
        firebase.database().ref('webBuzzer/' + QueryString().id).child('mostRecentBuzz').on('value', function(data) {
          if (data.val() != 0) {
            if (data.val() == nameNumber) {
              document.getElementById('mainSection').innerHTML = "<h1>You were the first to buzz!</h1><br>"
            } else {
              room.child('people').child(data.val()).once('value', function(name) {
                document.getElementById('mainSection').innerHTML = "<h1>" + name.val() + " was the first to buzz!</h1><br>"
              })
            }
          } else {
            document.getElementById('mainSection').innerHTML = "<button class=\"buzzer\" onclick=\"buzz()\"></button>"
          }
        })
      }
    })
  } else {
    alert('A valid name is required.')
  }
}

function generate5digitCode() {
  var roomCode = ""
  while (roomCode.length != 5) {
    roomCode = "" + Math.floor(Math.random()*100000)
  }
  return roomCode;
}

function QueryString() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}
