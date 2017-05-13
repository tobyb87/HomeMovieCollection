$(document).ready(function() {
  // Getting references to the name inout and movies container, as well as the table body
  var nameInput = $("#movies-name");
  var moviesList = $("tbody");
  var moviesContainer = $(".movies-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an movies
  $(document).on("submit", "#movies-form", handlemoviesFormSubmit);
  $(document).on("click", ".delete-movies", handleDeleteButtonPress);

  // Getting the intiial list of movies
  getmovies();

  // A function to handle what happens when the form is submitted to create a new movies
  function handlemoviesFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertmovies function and passing in the value of the name input
    upsertmovies({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an movies. Calls getmovies upon completion
  function upsertmovies(moviesData) {
    $.post("/api/movies", moviesData)
      .then(getmovies);
  }

  // Function for creating a new list row for movies
  function createmoviesRow(moviesData) {
    var newTr = $("<tr>");
    newTr.data("movies", moviesData);
    newTr.append("<td>" + moviesData.name + "</td>");
    newTr.append("<td> " + moviesData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?movies_id=" + moviesData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?movies_id=" + moviesData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-movies'>Delete movies</a></td>");
    return newTr;
  }

  // Function for retrieving movies and getting them ready to be rendered to the page
  function getmovies() {
    $.get("/api/movies", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createmoviesRow(data[i]));
      }
      rendermoviesList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of movies to the page
  function rendermoviesList(rows) {
    moviesList.children().not(":last").remove();
    moviesContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      moviesList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no movies
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an movies before you can create a Post.");
    moviesContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("movies");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/movies/" + id
    })
    .done(getmovies);
  }
});