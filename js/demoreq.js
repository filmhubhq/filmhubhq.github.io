function reqDemo() {
  $('#inputSubmit').html("<i class='fas fa-spinner fa-spin'>").attr('disabled',true);
  var url = "aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVDA1NVVUMzNHL0IwTjdZRVRRVy9PNkx3NU5HbXRpaEtyd3d6Q0hvMGN5YXY=";
  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var phone = $("#inputPhone").val();
  var company = $("#inputCompany").val() || "(not specified)";
  var country = $("#inputCountry").val() || "(not specified)";
  var catalog = $('input[name=inputCatalog]:checked', '#requestdemoform').val() || "(not specified)";
  var url_atob = atob(url);
  var fallback =
    'Yay - another demo request, <@USCTL8RJB>\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone + '\n' +
    'Company: ' + company + '\n' +
    'Country: ' + country + '\n' +
    'Catalog Size: ' + catalog;
  var message = {
    // "channel": "@klaus",
    "attachments": [{
      "fallback": fallback,
      "pretext": "Yay - another demo request, <@USCTL8RJB>",
      "fields": [
        { "title": "Name",         "value": name },
        { "title": "Email",        "value": email },
        { "title": "Phone",        "value": phone },
        { "title": "Company",      "value": company },
        { "title": "Country",      "value": country },
        { "title": "Catalog Size", "value": catalog },
      ]
    }]
  };
  $.ajax({
    method: 'POST',
    url: url_atob,
    data: JSON.stringify(message),
    dataType: 'text',
    processData: false,
  }).done(function()  {
    window.location.replace("https://cal.mixmax.com/luiscarhuayo/30");
  }).fail(function()  {
    $("#requestdemomodal .modal-body").html("Sorry - there was an error. Please reload and try again.");
    $("#requestdemomodal .modal-footer").html('<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>');
  }).complete(function() {
    $("#requestdemobtn").hide();
  });
}

$(document).ready(function() {
  $( "#requestdemoform" ).submit(function( event ) {
    event.preventDefault();
    reqDemo();
  });
});
