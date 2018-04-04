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

    database.ref("/users").push({
      name: name,
      email: email,
      user: user,
      pass: pass,
      rePass: rePass,
      prof: prof,
      bio: bio  
  })
  }

  else {
    $("#textArea").html("<strong><h3>Sorry, it looks like your passwords don't match. Please enter again.</h3></strong>")
    $("#password").val("")
    $("#repassword").val("")
  }
})