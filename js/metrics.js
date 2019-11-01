function getMetrics() {
  $.getScript("https://app.filmhub.com/api/v1/dasheroo/channels_total.js?callback=updateChannels")
  $.getScript("https://app.filmhub.com/api/v1/dasheroo/titles_total.js?callback=updateTitles")
}

function updateChannels ( data ) {
  $("#channels_metrics").html( data.channels_total.value );
}

function updateTitles ( data ) {
  $("#titles_metrics").html( data.titles_self_serve.value + data.titles_sales.value );
}

$(document).ready(function() {
  getMetrics();
});
