  
//  $( document ).ready(function(){


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3_X63IybWvheUGhH08x2FCuRWsCCNqa4",
    authDomain: "web-quickstart-d9627.firebaseapp.com",
    databaseURL: "https://web-quickstart-d9627.firebaseio.com",
    projectId: "web-quickstart-d9627",
    storageBucket: "web-quickstart-d9627.appspot.com",
    messagingSenderId: "258264822304"
  };
  firebase.initializeApp(config);

  
var database = firebase.database()

$("button").on("click", function(){

var name = $("#name").val().trim()
var email = $("#email").val().trim()
var username = $("#username").val().trim()
var password = $("#password").val().trim()
var retypepassword = $("#retypePassword").val().trim()
var proficiencies = $("#proficiencies").val().trim()
var bio = $("#bio").val();

console.log(name);
alert ("button working");

database.ref("/users").push({
  name:name,
  email:email,
  username:username,
  password:password,
  retypepassword:retypepassword,
  proficiencies:proficiencies,
  bio:bio
});

});

// });
 