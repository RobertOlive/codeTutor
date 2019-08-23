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

// presence
var connectionsRef = database.ref("/connections")

var connectedRef = database.ref(".info/connected")
console.log(connectedRef)



connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

// end of presence


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


// SESSION PAGE

var clientId = "demo";
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
      clientid: clientId,
      code: url
    }
  });
}

// boilerplate for grabbing url parameters.... eg. "?gruCode=0000codeTutor"
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