var topics = ["dogs", "cats", "birds"];

// take items in topic array and create buttons in html
// use looping that appends a button for each string in the array

// when click on button. page should grab 10 static non animated gifs images
// when click on .gif the gif should animate
// keeps the button from repeating


function createButton() {
	$("#button-container").empty();

	for( var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.addClass("gif");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);
		console.log(topics)
		$("#button-container").append(button);
	}
};

$("#add-topics").on("click", function(event) {
  console.log("ADD TOPIC BUTTON WITH ENTER");
	event.preventDefault();

	// the enter button does not work - and will not add like that

	var inputUser = $("#searchGiphy").val().trim();
	topics.push(inputUser);
	console.log(topics)
	createButton();
});

createButton();


$(".gif").on("click", function() {
    console.log(this);
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
