var api_key = keys;
var giphyCount = 0
var topics = ["Three Billboards", "The Godfather", "Halloween", "Kill Bill", "Pulp Fiction"];

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

// function createGiphyDiv(index, obj, fn) - add callfunction to Favorite
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

	var buttonFav = $("<button>");

	buttonFav.addClass("fav-button");
	buttonFav.text("Favorite");
	// buttonFav.click(function() {
 //      fn();
 //  });

	var a = $("<a>")
	a.attr("href", obj[index].images.fixed_height.url)
  var buttonDL = $("<button>");
	buttonDL.text("Download");
	a.append(buttonDL)
	giphyCount++
	giphy_div.append(p, img, $("<br>"), buttonFav, a);
	$("#displaygifs").prepend(giphy_div);
}

addButton();

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var input = $("#giphy-input").val().trim();
  topics.push(input);
  addButton();
  $("#giphy-input").val("");
});

$(document).on("click", ".animals", function() {
	var searchInput = $(this).attr("data-name");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ searchInput +
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

// two issues - prevent space becoming a button
// the gif removes itself and adds to favorites.
// which i don't want. I want it to stay and for me to copy
