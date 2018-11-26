 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyALDPbDYLEABK204oV5Mt9YL_fc4MDWNto",
  authDomain: "project-5503768607700690221.firebaseapp.com",
  databaseURL: "https://project-5503768607700690221.firebaseio.com",
  projectId: "project-5503768607700690221",
  storageBucket: "project-5503768607700690221.appspot.com",
  messagingSenderId: "52011702272"
};
firebase.initializeApp(config)

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

  

  dataRef.ref().on("child_added", function(childsnapshot) {
    var trainName = childsnapshot.val().train;
    var trainDestination = childsnapshot.val().destination;
    var trainStart = childsnapshot.val().start;
    var tFrequency = childsnapshot.val().frequency

    var firstTime = trainStart;
    
    // First Time (pushed back 1 day to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "day");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = (diffTime-1440) % tFrequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    
    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
                
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway),
    );
    $("#train-table>tbody").append(newRow);

    console.log(trainName)
    console.log(trainDestination)
    console.log(tFrequency)
    console.log(nextTrain)
    console.log(minutesAway)

});
