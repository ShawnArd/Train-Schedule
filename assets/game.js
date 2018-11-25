 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDDPRxoeghT4dV5a8xD19-wZTJ6r4SjeZU",
    authDomain: "train-schedule-a7b50.firebaseapp.com",
    databaseURL: "https://train-schedule-a7b50.firebaseio.com",
    projectId: "train-schedule-a7b50",
    storageBucket: "",
    messagingSenderId: "1015897166677"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Capture Button Click
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
   var  train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Code for the push
    dataRef.ref().push({

     train: train,
      destination: destination,
      start: start,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });

  

  dataRef.ref().on("child_added", function(childSnapshot) {
    var trainName = childsnapshot.val().name;
    var trainDestination = childsnapshot.val().destination;
    var trainStart = childsnapshot.val().start;
    var trainFrequency = childsnapshot.val().frequency

    var firstTime = start;
    
    // First Time (pushed back 1 day to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "day");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = (diffTime-1440) % tFrequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
                
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainStart),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
    );
    $("#train-table > tbody").append(newRow);
});
