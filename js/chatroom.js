var config = {
    apiKey: "AIzaSyDQoN-9i2AJc8Uih0hkazoFbLqZTpOd8jI",
    authDomain: "webchatdata-dc598-default-rtdb.firebaseio.com",
    databaseURL: "https://webchatdata-dc598-default-rtdb.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "275692971177"
};
firebase.initializeApp(config);

const msg = document.getElementById('message');

function sendMessage(){
    var Msg = msg.value;
    var snt = firebase.database().ref('/messages').push(Msg);
	snt.then(successfull, failed);
}


function LogOut(){
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser){
       console.log(firebaseUser);
       logOut.classList.remove('hide');
   }else{
       console.log('not logged in');
       window.open("index.html",'_self',false);
   }
});
var count = 0;
var audio = new Audio('audio_file.mp3');

firebase.database().ref('/messages').on('child_added', function(data){
    console.log(data.val());
    var node = document.createElement('li');
    node.innerHTML = data.val();
    document.getElementById('chat').appendChild(node);
	 audio.play();
	var elem = document.getElementById('data');
  elem.scrollTop = elem.scrollHeight;
 
});

function deleteAll() {
	
	 firebase.database().ref().set(null);
var list=document.getElementById('chat');

list.removeChild(list.getElementsByTagName('li')[0]);
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const chat = document.querySelector('#chat');
removeAllChildNodes(chat);

setTimeout(function() {
            location.reload();
            }, 2000);

            return true;
        
}






//Actions for the .set() promise successfull or failed
function successfull(){
  snackbar('Sent OK')
}

function failed(){
  snackbar('Error, Not Sent')
}




function snackbar(text) {
  var snackbarContainer = document.querySelector('#demo-toast-example');
  var data = {message: text};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
