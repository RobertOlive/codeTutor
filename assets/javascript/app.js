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

  var emailEnc = email.replace(/\./g, "period")
  console.log(emailEnc)
  if (pass === rePass) {

    // signupFn(); 

    window.location = "index.html"

    $("#textArea").html("");

    database.ref(emailEnc).set({
        name: name,
        email: emailEnc,
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
      window.location = "index.html"
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
      if (snap.val()[user].user != undefined) {
        var key = snap.val()[user].user
        userNames.push(key)
      }
    }
    for (var i = 0; i < userNames.length; i++) {
      $("#tbody1").append("<tr><td>" + userNames[i] + "</tr></td>")
    }

  }

  for (var prof in snap.val()) {

    if (snap.val().hasOwnProperty(prof)) {
      if (snap.val()[prof].prof != undefined) {
        var key = snap.val()[prof].prof
        proficiencies.push(key)
      }
    }
    for (var i = 0; i < proficiencies.length; i++) {
      $("#tbody2").append("<tr><td>" + proficiencies[i] + "</tr></td>")
    }

  }

  for (var email in snap.val()) {

    if (snap.val().hasOwnProperty(email)) {
    var key
      if (snap.val()[email].email != undefined) {
        key = snap.val()[email].email.split("period").join('.')
        console.log(key)
        emails.push(key)
      }
    }
    for (var i = 0; i < emails.length; i++) {
      $("#tbody3").append("<tr><td class = 'email'>" + emails[i] + "</tr></td>")
    }
  }

})


var gruCode = Math.floor(Math.random() * 100000)+"codeTutor"

var url = getAllUrlParams().gruCode
console.log(url);
$(document).on("click", ".email", function () {
  // send email function
  window.location = "session.html?gruCode="+gruCode

  console.log($(this).text())
  window.open('mailto:'+$(this).text()+'?subject="Your codeTutor Code!"&body=Attached is your videochat code: "' + gruCode + '" Please go to codeTutor/session.html?gruCode=' + gruCode +  ' for your tutoring!');
})


// END OF PROFILE BROWSER

// SESSION PAGE

    // This code loads the Gruveo Embed API code asynchronously.
    var tag = document.createElement("script");
    tag.src = "https://www.gruveo.com/embed-api/";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
    // This function gets called after the API code downloads. It creates
    // the actual Gruveo embed and passes parameters to it.
    var embed;
    // Line below is the method for generating a random room code - Need to get it to work with our app
    // Gruveo.Embed.generateRandomCode():String
    function onGruveoEmbedAPIReady() {
      embed = new Gruveo.Embed("myembed", {
        responsive: 1,
        embedParams: {
          code: url
        }
      });
    }


    function getAllUrlParams(url) {

      // get query string from url (optional) or window
      var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    
      // we'll store the parameters here
      var obj = {};
    
      // if query string exists
      if (queryString) {
    
        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];
    
        // split our query string into its component parts
        var arr = queryString.split('&');
    
        for (var i=0; i<arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split('=');
    
          // in case params look like: list[]=thing1&list[]=thing2
          var paramNum = undefined;
          var paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return '';
          });
    
          // set parameter value (use 'true' if empty)
          var paramValue = typeof(a[1])==='undefined' ? true : a[1];
    
          // // (optional) keep case consistent
          // paramName = paramName.toLowerCase();
          // paramValue = paramValue.toLowerCase();
    
          // if parameter name already exists
          if (obj[paramName]) {
            // convert value to array (if still string)
            if (typeof obj[paramName] === 'string') {
              obj[paramName] = [obj[paramName]];
            }
            // if no array index number specified...
            if (typeof paramNum === 'undefined') {
              // put the value on the end of the array
              obj[paramName].push(paramValue);
            }
            // if array index number specified...
            else {
              // put the value at that index number
              obj[paramName][paramNum] = paramValue;
            }
          }
          // if param name doesn't exist yet, set it
          else {
            obj[paramName] = paramValue;
          }
        }
      }
    
      return obj;
    }
    console.log(queryString)
  // we'll store the parameters here
  // var obj = {};