// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQoN-9i2AJc8Uih0hkazoFbLqZTpOd8jI",
    authDomain: "webchatdata-dc598-default-rtdb.firebaseio.com",
    databaseURL: "https://webchatdata-dc598-default-rtdb.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "275692971177"
};
firebase.initializeApp(config);

// Get all the elements
var _firstName  = document.getElementById("first_name");
var _lastName  = document.getElementById("last_name");
var _password  = document.getElementById("password");
var _email  = document.getElementById("email");
var _username = document.getElementById("username");
const logIn  = document.getElementById("logIn");
var signIn  = document.getElementById("signIn");

function LogIN(){
    const emailID = document.getElementById('email_log').value;;
    const pass = document.getElementById('password_log').value;;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(emailID, pass);
    promise.catch(e => console.log(e.message));    
}

function SignUP(){    
    const emailID = _email.value;
    const pass = _password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(emailID, pass);
    promise.catch(e => console.log(e.message));
}
function writeUserData(user, fname, lname) {
  var myuser = {
    username: user,
    firstName: fname,
    lastName: lname
  };
   
   firebase.database().ref('/users').child("user"); firebase.database().ref('/users/'+user).push(myuser).then(function(){
           window.open("chat.html",'_self',false); 
    });
}
firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser){
       console.log(firebaseUser);
       const fName = _firstName.value;
        const lName = _lastName.value;
        const uName = _username.value;
        writeUserData(uName, fName, lName);
   }else{
       console.log('not logged in');
}});
