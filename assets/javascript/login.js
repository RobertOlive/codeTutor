// LOGIN PAGE

$("#logSubmit").on("click", function() {

    // on page load, and when database data changes
    database.ref().on("value", function(snap) {
      console.log(snap.val());
  
      var emailLog = $("#logEmail").val().trim().replace(/\./g, "period");
      var passLog = $("#logPass").val().trim();
      console.log(emailLog)
      console.log(snap.child(emailLog).val().email)
  
      // if email and pass are in the database
      if (emailLog === snap.child(emailLog).val().email && passLog === snap.child(emailLog).val().pass) {
  
        // clears text fields, take user to homepage
        $("#loginText").html("")
        window.location = "index.html"
      }
  
      // if credentials are wrong, or incorrect, notify user and clear fields
      else {
        $("#loginText").html("<h3><strong>Sorry, it looks like your login info is incorrect. Please enter again.</strong></h3>")
        $("#logEmail").val("")
        $("#logPass").val('')
      }
    })
  })
  
  // END OF LOGIN PAGE