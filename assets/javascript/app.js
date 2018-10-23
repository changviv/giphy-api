var api_key = keys;

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


		console.log(response)

		for (var i = 0; i < response.data.length; i++) {
			var resp_data = response.data
			var giphy_div = $("<div>");
			var img = $("<img>");
			var p = $("<p>").text("Rating: " + resp_data[i].rating);

			img.attr("src", resp_data[i].images.fixed_height.url)
			giphy_div.append(p, img);

			$("#displaygifs").prepend(giphy_div);
		}
	})
});

