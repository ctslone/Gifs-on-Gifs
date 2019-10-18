// pseudocode
// document loads and displays all current HTML and css elements. once document loads, load the javascript
// topics array buttons are only buttons to display upon load
// when user clicks on any of the buttons at the top, a random selection of 10 gifs (of the category of the button) populates in the gif-div, all the same or similar size, with their associated rating.
// if user types in the search bar and click search, add a button to the page with the words that they typed in. Append or prepend button to the button div.
// When user adds a button, the value they type in will be used as the data attr for use in th giphy API search. the text they type will be saved as data-car and user for search as well as be the button name
// when user click submit button, the text inside the button is cleared so they know it was added

// waiting until document fully loads
$(document).ready(function () {
  // defining varibles for starting buttons
  var topics = ["Mustang", "Corvette", "Camaro", "Ferrari", "Lamborghini", "Porsche", "Aston Martin"]
  // listener for the add new gifs button
  $("#search-btn").on("click", function (event) {
    // allowing user to hit enter for submit
    event.preventDefault()
    // creating a variable to store the user input
    var newCar = $("#user-search").val().trim();
    // push to topics array
    topics.push(newCar);
    // clearing the div and then run the gif buttons function again
    $("#user-search").val('');
    $("#gif-buttons").empty();
    gifButtons()
  })

  // creating a click listener for the buttons
  $("#gif-buttons").on("click", ".topic-button", function () {
    $("#gif-div").empty();
    var lastClick = $(this).attr("data-car"); 
    // assigning a data attribute to each button that is clicked
    var cars = $(this).attr("data-car");
    console.log(cars);
    // assigning a random number to the URL to return "random" gifs of the right category
    var offset = Math.floor(Math.random()*100-0) + 100;
    // defining the url that will be used in the api. created so that each time a user clicks a button, the button data attr is used in the query url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cars + "&api_key=ZUploi9XhhDkoDvUWIWS4wvWBsOPVD8T&limit=10&offset="+ offset +"";
    // performing ajax get request for giphy api and only allowing 10 results
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
          // creating a div for each image to reside
          var gifDiv = $("<div id='generated-gif' class='float-left'>");
          // storing the rating of each gif in a varible
          var rating = results[i].rating;
          console.log(rating);
          // creating a p tag to hold each gif rating
          var ratingP = ("<p> Rating: " + rating + "</p>")
          console.log(ratingP)
          //  assigning attributes to the image/gif to call upon for the API
          var carImage = $("<img>").attr({
            "class": "clicked",
            "src": results[i].images.fixed_height_still.url,
            "data-state": "still",
            "data-still": results[i].images.fixed_height_still.url,
            "data-animate": results[i].images.fixed_height.url,
          })
          // was trying to add each gif to a bootstrap card here
          // var fixedHeight = results[i].images.fixed_height_still.url
          // var gifCard = $("<div class='card' style='width: 18rem;> <img src='"+fixedHeight+"' class='card-img-top' alt='...'> <div class='card-body'> <p class='card-text'>Rating: "+rating+" </p> </div> </div> </div>"
          // )
          // gifDiv.prepend(gifCard);

          // adding the gifs and rating to the JS created div and p tag
          gifDiv.prepend(ratingP);
          gifDiv.prepend(carImage);
          // adding the gifs to the page
          $("#gif-div").prepend(gifDiv);
        }

        // clicks to start and stop the gifs
        $(".clicked").on("click", function () {
          console.log(this);
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', "animate");
          } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', "still");
          }
        })

      })

      $("#more-btn").on("click", function () {
        moreGIFs();
      })

      // function for adding 10 more gifs to the page. it works well for the pre-populated buttons tha are created from the initial array but for a new user added button, it adds gifs of the last 2 buttons the user clicked instead of the single last one
      // I believe the problem lies within the lastClick variable. on the console.log(lastClick), it prints the two last clicked buttons instead of the actual last click.
      // I need to clear that array somehow before it puts the last click value in each time, in order to prevent it from having 2 values in the lastClicked array
      function moreGIFs() {
        console.log(lastClick);
        var offset = Math.floor(Math.random()*100-0) + 100;
        // defining the url that will be used in the api. created so that each time a user clicks a button, the button data attr is used in the query url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + lastClick + "&api_key=ZUploi9XhhDkoDvUWIWS4wvWBsOPVD8T&limit=10&offset="+ offset +"";
        // performing ajax get request for giphy api and only allowing 10 results
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function (response) {
            var results = response.data;
            console.log(results);
    
            for (var i = 0; i < results.length; i++) {
              // creating a div for each image to reside
              var gifDiv = $("<div id='generated-gif' class='float-left'>");
              // storing the rating of each gif in a varible
              var rating = results[i].rating;
              console.log(rating);
              // creating a p tag to hold each gif rating
              var ratingP = $("<p id='rating'> Rating: " + rating + "</p>")
              // console.log(ratingP)
              //  assigning attributes to the image/gif to call upon for the API
              var carImage = $("<img>").attr({
                "class": "clicked",
                "src": results[i].images.fixed_height_still.url,
                "data-state": "still",
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
              })
              // adding the gifs and rating to the JS created div and p tag
              gifDiv.prepend(ratingP);
              gifDiv.prepend(carImage);
              // adding the gifs to the page
              $("#gif-div").prepend(gifDiv);
            }
    
            // clicks to start and stop the gifs
            $(".clicked").on("click", function () {
              console.log(this);
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr('src', $(this).attr("data-animate"));
                $(this).attr('data-state', "animate");
              } else {
                $(this).attr('src', $(this).attr("data-still"));
                $(this).attr('data-state', "still");
              }
            })
    
          })
      }

  })

  // making the original buttons with a data value for use in the API
  function gifButtons() {
    for (i = 0; i < topics.length; i++) {
      // checking functionality of the loop
      console.log(topics[i]);
      $("#gif-buttons").append("<button type='button' data-car='" + topics[i] + "'  class='topic-button btn btn-danger'>" + topics[i] + "</button>")
    }
  }
  gifButtons()

  

})



