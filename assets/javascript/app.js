var api_key = 'A5JP5g1UDgzwg7zLWRYWHjdJMaf0zH9B';
var topics = ["Disney", "The Godfather", "Halloween", "Kill Bill 2", "Cabin in the Woods"];

function addButton() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("animals");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttons-view").append(button);
  }
};

function createGiphyDiv(index, obj) {
	var giphy_div = $("<div>");
	giphy_div.addClass("giphy-card");

	var p = $("<p>")
	p.text("Rating: " + obj[index].rating);

	var img = $("<img>");
	img.attr("src", obj[index].images.fixed_height.url);
	img.addClass("gifs");
	img.attr("data-still", obj[index].images.fixed_height_still.url);
	img.attr("data-animate", obj[index].images.fixed_height.url);
	img.attr("data-type", "animate");
	giphy_div.append(p, img);
	$("#displaygifs").prepend(giphy_div);
}

addButton();

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var input = $("#giphy-input").val().trim();
  compare = $.inArray(input, topics)

  if (input === "") {
  	alert("This isn't a button try again")
  } else if (compare === (-1)) {
  	topics.push(input);
  } else {
  	alert("You added this button already")
  }
  addButton();
  $("#giphy-input").val("");
});

$(document).on("click", ".animals", function() {
	var searchInput = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ searchInput +
									"&api_key=" + api_key + "&limit=10";

	$.ajax({
		url:queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			var resp_data = response.data
			createGiphyDiv(i, resp_data);
		}
	})
});


$(document).on("click", ".gifs", function() {
	if ($(this).attr("data-type") === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-type", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-type", "animate");
  }
});

