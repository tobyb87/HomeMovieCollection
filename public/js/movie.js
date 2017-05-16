$(document).ready(function() {
  // Getting references to the name inout and movie container, as well as the table body
  var nameInput = $("#movie-name");
  var movieList = $("tbody");
  var movieContainer = $(".movie-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Movie
  $(document).on("submit", "#movie-form", handleMovieFormSubmit);
  $(document).on("click", ".delete-movie", handleDeleteButtonPress);

  // Getting the intiial list of Movies
  getMovies();

  // A function to handle what happens when the form is submitted to create a new Movie
  function handleMovieFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertMovie function and passing in the value of the name input
    upsertMovie({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an movie. Calls getMovies upon completion
  function upsertMovie(movieData) {
    $.post("/api/movies", movieData)
      .then(getMovies);
  }

  // Function for creating a new list row for movies
  function createMovieRow(movieData) {
    var newTr = $("<tr>");
    newTr.data("movie", movieData);
    newTr.append("<td>" + movieData.name + "</td>");
    newTr.append("<td> " + movieData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?movie_id=" + movieData.id + "'>Go to Plots</a></td>");
    newTr.append("<td><a href='/cms?movie_id=" + movieData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-movie'>Delete Movie</a></td>");
    return newTr;
  }

  // Function for retrieving movies and getting them ready to be rendered to the page
  function getMovies() {
    $.get("/api/movies", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createMovieRow(data[i]));
      }
      renderMovieList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of movies to the page
  function renderMovieList(rows) {
    movieList.children().not(":last").remove();
    movieContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      movieList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no movies
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an Movie before you can create a Post.");
    movieContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("movie");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/movies/" + id
    })
    .done(getMovies);
  }
});
