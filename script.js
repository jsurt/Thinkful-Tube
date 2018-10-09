const ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyAH3n0AVo3RaBhwbs2lNFCQh6UJmluqj-w',
    q: `${searchTerm} in:name`,
    per_page: 5
  }
  //console.log($.getJSON(ENDPOINT_URL, query, callback));
  $.getJSON(ENDPOINT_URL, query, callback)
}

function displayYouTubeSearchData(data) {
  console.log(data);
  var resultsHTML = '<div class="row">';
  data.items.forEach(function (item) {
    resultsHTML = (resultsHTML + '<div class="search-item col s12 m6"><div class="card small hoverable">' +
      '<div class="card-image">' +
        '<iframe src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>' +
      '</div>' +
      '<div class="card-content">' +
        '<p class="truncate">' + item.snippet.title + '</p>' +
      '</div>' +
      '<div class="card-action">' +
        '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">View more from '+ item.snippet.channelTitle + '</a>' +
      '</div>' + 
      '</div></div>')
  });  
  resultsHTML = resultsHTML + '</div>';
  $('.js-search-results').html(resultsHTML);
}

function getQuery() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    const searchTarget = $(e.currentTarget).find('.js-input');
    const query = searchTarget.val();
    $('.js-input').val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

getQuery();