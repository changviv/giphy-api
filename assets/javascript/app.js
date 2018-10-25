var api_key = keys;
var giphyCount = 0
var topics = ["cat", "dog", "bird"];

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


addButton();

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var input = $("#giphy-input").val().trim();
  topics.push(input);
  addButton();
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
			var giphy_div = $("<div>");
			giphy_div.addClass("giphy-card");


			var p = $("<p>")
			p.attr("id", "p-"+ giphyCount);
			p.text("Rating: " + resp_data[i].rating);

			var img = $("<img>");
			img.attr("id", "image-" + giphyCount)
			img.attr("src", resp_data[i].images.fixed_height.url);
			img.addClass("gifs");
			img.attr("data-still", resp_data[i].images.fixed_height_still.url);
			img.attr("data-animate", resp_data[i].images.fixed_height.url);
			img.attr("data-type", "animate");

			var buttonDiv = $("<div class='buttons'>");
			var buttonFav = $("<button>");
			var buttonDL = $("<button>");
			buttonFav.addClass("fav-button");
			buttonFav.attr("fav-index", giphyCount);
			buttonFav.text("Favorite");

			buttonDL.addClass("dl-button");
			buttonDL.attr("dl-index", "dl-" + giphyCount);
			buttonDL.text("Download");
			giphyCount++

			buttonDiv.append(buttonFav, buttonDL)
			giphy_div.append(p, img, buttonDiv);

			$("#displaygifs").prepend(giphy_div);
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

$(document).on("click", ".fav-button", function() {
	number = $(this).attr("fav-index");


	console.log(number);

// 	console.log($(this).attr(".giphy-card"))
// 	var p = $("#p-" + number);
// // 	//add ID to fav button and DL button
// 	console.log(p)
// // 	favDiv.append()

// 	$("#favorites-view").append(p)


});

$(document).on("click", ".dl-button", function() {

});

