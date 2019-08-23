// PROFILE BROWSER PAGE

var userNames = []

var proficiencies = []

var emails = []

// on value, execute function just once
database.ref().once("value", function(snap) {
  console.log(snap.val())
  function getData() {
    for (var user in snap.val()) {
        console.log("hi");
        // if it exists
        if (snap.val().hasOwnProperty([user])) {
          // and does not equal undefined
          if (snap.val()[user].user != undefined && snap.val()[user].prof != undefined && snap.val()[user].email != undefined) {
              console.log("howre you");
            // take "user", push to array
            var key1 = snap.val()[user].user
            var key2 = snap.val()[user].prof
            var key3 = snap.val()[user].email
            // push ALL "user"s to array
            userNames.push(key1)
            proficiencies.push(key2)
            emails.push(key3)
          }
        }
      }
  }

  getData();

  console.log(userNames)
  // push each element of array to table  
      for (var i = 0; i < userNames.length; i++) {
          $("#tbody1").append("<tr><td id = " + userNames[i] + ">" + userNames[i] + "</td></tr>")
          $("#tbody2").append("<tr><td id = " + proficiencies[i] + ">" + proficiencies[i] + "</td></tr>")
          $("#tbody3").append("<tr><td class = 'email'>" + emails[i] + "</td></tr>")
      }
})

// generates room code
var gruCode = Math.floor(Math.random() * 100000)+"codeTutor"

// gets url parameters
var url = getAllUrlParams().gruCode
console.log(url);

// on click of dynamically created emails
$(document).on("click", ".email", function () {

  // sends user to session.html with dynamically generated room code
  
  //  // send email function
  
  // $(this).text grabs the text of the email that was clicked
  console.log($(this).text())
  // open user email app, compose text with dynamically generated room code
  window.open('mailto:'+$(this).text()+'?subject="Your codeTutor Code!"&body=Attached is your videochat code: "' + gruCode + '" Please go to https://robertolive.github.io/codeTutor/session.html?gruCode=' + gruCode +  ' for your tutoring!');
  window.location = "session.html?gruCode="+gruCode
})


// END OF PROFILE BROWSER