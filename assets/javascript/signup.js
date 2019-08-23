// SIGNUP PAGE
// button click function
$("#submitBtn").on("click", function() {

    // grabs input from fields
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var user = $("#username").val().trim();
    var pass = $("#password").val().trim();
    var rePass = $("#repassword").val().trim();
    var prof = $("#proficiencies").val().trim();
    var bio = $("#bio").val().trim();
  
    // replaces every period in the email variable
    var emailEnc = email.replace(/\./g, "period")
    // 
    console.log(emailEnc)
  
  // password authentication
    if (pass === rePass) {
  
      // takes user to home page after submit
      window.location = "index.html"
  
      // clears text inputs
      $("#textArea").html("");
  
      // creates user object in firebase
      database.ref(emailEnc).set({
          name: name,
          email: emailEnc,
          user: user,
          pass: pass,
          rePass: rePass,
          prof: prof,
          bio: bio  
      })
  
    }
    // if passwords dont match, notify user, clear password fields
    else {
      $("#textArea").html("<strong><h3>Sorry, it looks like your passwords don't match. Please enter again.</h3></strong>")
      $("#password").val("")
      $("#repassword").val("")
    }
  });
  
  // END OF SIGNUP PAGE