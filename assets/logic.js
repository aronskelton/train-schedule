//took a lot of this code from online still having trouble with firebase as well as moment.js.. I will be adding to this 
  

  var config = {
    apiKey: "AIzaSyAikHRh-wt18aL5f_WtkAYHXtnuOdQzS9A",
    authDomain: "time-73498.firebaseapp.com",
    databaseURL: "https://time-73498.firebaseio.com",
    projectId: "time-73498",
    storageBucket: "time-73498.appspot.com",
    messagingSenderId: "851404188176"
  };
  firebase.initializeApp(config);

  var database = firebase.database(); 


var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = firebase.database().name;
    var destination = firebase.database().destination;
    var firstTrain = firebase.database().firstTrain;
    var frequency = firebase.database().frequency;
    var min = firebase.database().min;
    var next = firebase.database().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   

});

$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

   
    if (trainName == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }

    // THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    return false;
});