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

  var login = false;

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