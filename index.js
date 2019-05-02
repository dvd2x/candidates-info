"use strict";

function getGitHubHandle(username, callback) {
  const option = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"
    })
  };
  $("#username").text(`Candidate Handle: ${username}`);
  fetch(`https://api.github.com/users/${username}/repos`, option)
    .then(response => response.json())
    .then(responseJson => callback(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.dir(responseJson);
  // if there are previous results, remove them
  $("#results-list").empty();
  responseJson.forEach(repo => {
    const url = `https://github.com/${repo.full_name}`;

    $("#results-list").append(`<li><a href="${url}">${repo.name} - ${url}</a>
    </li>`);
  });
  $("#results").show();
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    // let username = $(event.username).find("#js-search-term");
    let login = $("#js-search-term").val();
    getGitHubHandle(login, displayResults);
  });
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});

//$(watchForm);
