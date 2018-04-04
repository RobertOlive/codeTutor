  
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
var name = $("#name").val().trim()
var email = $("#email").val().trim()
var username = $("#username").val().trim()
var password = $("#password").val().trim()
var retypepassword = $("#retypePassword").val().trim()
var proficiencies = $("#proficiencies").val().trim()
var bio = $("#bio").val().trim()