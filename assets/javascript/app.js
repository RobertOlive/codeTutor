  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyACmatzwuy2pude3U4ge5MWpdArYQSvoRE",
    authDomain: "survival-handbook.firebaseapp.com",
    databaseURL: "https://survival-handbook.firebaseio.com",
    projectId: "survival-handbook",
    storageBucket: "survival-handbook.appspot.com",
    messagingSenderId: "490773360155"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var connectionsRef = database.ref("/connections")

  var connectedRef = database.ref(".info/connected")
  console.log(connectedRef)

  var login;

  connectedRef.on("value", function(snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });

// SIGNUP PAGE
$("#submitBtn").on("click", function() {
  var name = $("#name").val().trim();
  var email = $("#email").val().trim();
  var user = $("#username").val().trim();
  var pass = $("#password").val().trim();
  var rePass = $("#repassword").val().trim();
  var prof = $("#proficiencies").val().trim();
  var bio = $("#bio").val().trim();

  if (pass === rePass) {

    // signupFn(); 

    $("#textArea").html("");

    database.ref(email).set({
        name: name,
        email: email,
        user: user,
        pass: pass,
        rePass: rePass,
        prof: prof,
        bio: bio  
    })

    login = true
  }

  else {
    $("#textArea").html("<strong><h3>Sorry, it looks like your passwords don't match. Please enter again.</h3></strong>")
    $("#password").val("")
    $("#repassword").val("")
  }
});

// END OF SIGNUP PAGE

// LOGIN PAGE

$("#logSubmit").on("click", function() {

  database.ref().on("value", function(snap) {
    var emailLog = $("#logEmail").val().trim();
    var passLog = $("#logPass").val().trim();
    console.log(emailLog)
    console.log(passLog)
    console.log(snap.child(emailLog).val().email)

    if (emailLog === snap.child(emailLog).val().email && passLog === snap.child(emailLog).val().pass) {

      $("#loginText").html("")
      login = true
    }

    else {
      $("#loginText").html("<h3><strong>Sorry, it looks like your login info is incorrect. Please enter again.</strong></h3>")
      $("#logEmail").val("")
      $("#logPass").val('')
    }
  })
})

// END OF LOGIN PAGE

// PROFILE BROWSER PAGE

var userNames = []

var proficiencies = []

var emails = []

database.ref().on("value", function(snap) {

  for (var user in snap.val()) {

    if (snap.val().hasOwnProperty(user)) {
    var key = snap.val()[user].user
    userNames.push(key)
    }
    for (var i = 0; i < userNames.length; i++) {
      $("#tbody1").append("<tr><td>" + userNames[i] + "</tr></td>")
    }

  }

  for (var prof in snap.val()) {

    if (snap.val().hasOwnProperty(prof)) {
    var key = snap.val()[prof].prof
      proficiencies.push(key)
    }
    for (var i = 0; i < proficiencies.length; i++) {
      $("#tbody2").append("<tr><td>" + proficiencies[i] + "</tr></td>")
    }

  }

  for (var email in snap.val()) {

    if (snap.val().hasOwnProperty(email)) {
    var key = snap.val()[email].email
      emails.push(key)
    }
    for (var i = 0; i < emails.length; i++) {
      $("#tbody3").append("<tr><td class = 'email'>" + emails[i] + ".com</tr></td>")
    }
  }

})

var gruCode = Math.floor(Math.random() * 100000)+"codeTutor"
$(document).on("click", ".email", function () {
  // send email function
  window.location = "session.html"
  console.log($(this).text())
  window.open('mailto:'+$(this).text()+'?subject="Your codeTutor Code!"&body="Attached is your videochat code:"'+gruCode+'');
})


// END OF PROFILE BROWSER

// ACCOUNT PAGE

// var signupFn = function() {
//    var userObj = {
//     name: name,
//     email: email,
//     user: user,
//     pass: pass,
//     rePass: rePass,
//     prof: prof,
//     bio: bio  
//    }
//    if (userObj) {
//      $("#tbodyAccount").html("<tr><td>" + name + 
//                             "</td><td>" + email + 
//                             "</td><td>" + user +
//                             "</td><td>" + prof +
//                             "</td><td>" + bio + "</td></tr>")
//    }
// }



// END OF ACCOUNT PAGE

// SESSION PAGE
