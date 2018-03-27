$(document).ready(function(){

//inital list of topics
var topics = ["Seinfeld", "The Simpsons", "Stranger Things", "Parks and Rec", "Game of Thrones", "The Office", "Friends", "Arrested Development", "Twin Peaks", "Breaking Bad", "Orange is the New Black"];

//function to create buttons 
function renderButtons() {

  $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      a = $("<button>");
      a.addClass("show").addClass("btn");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#gif-buttons").append(a);
    }
  }

  //adds user input to the topics array from which buttons are added
  $("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#gif-search").val().trim();
    topics.push(show);
    renderButtons();
    $("input[type=text]").val('');
  });

  renderButtons();

  //changes the state of the gif to create play/pause effect
  $(document).on("click", ".gif", function(event) {
    var state = $(this).attr("data-state");

    if(state === "still"){
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state","animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state","still");
    };
   
  });

  //triggers API call to retrieve data based on button name attribute 
  $(document).on("click", ".show", function(event) {
    console.log($(this).attr("data-name"));
    var search = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=X17cgLPsCm0xci6fJAkF8nn4JhFBK7RI&q=" + search + "&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;

    //creates div to append gifs to DOM
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still");
        gifImage.addClass("gif");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        gifDiv.append(gifImage);
        gifDiv.append(p);

        $("#show-gifs").prepend(gifDiv);
      }

    }); 
    
 }); 

});