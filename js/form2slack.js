// send contact form to Slack
function sendForm2Slack() {
  $('#inputSubmit').html("<i class='fa fa-spinner fa-spin'>").attr('disabled',true);
  $("#requestdemomodal .modal-body").after(
    '<div class="modal-footer">' +
    '  <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>' +
    '</div>');
  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var phone = $("#inputPhone").val();
  var company = $("#inputCompany").val() || "(not specified)";
  var country = $("#inputCountry").val() || "(not specified)";
  var catalog = $('input[name=inputCatalog]:checked', '#requestdemoform').val() || "(not specified)";
  var fallback =
    'Yay - another demo request, <@roger>!\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone + '\n' +
    'Company: ' + company + '\n' +
    'Country: ' + country + '\n' +
    'Catalog Size: ' + catalog;
  var message = {
    "attachments": [{
      "fallback": fallback,
      "pretext": "Yay - another demo request, <@U055UT33L>",
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
    url: "https://hooks.slack.com/services/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",
    data: JSON.stringify(message),
    dataType: 'text',
    processData: false,
  }).done(function()  {
      $("#requestdemomodal .modal-body").html("Thank you! The request was successfully sent. We'll contact you asap.");
  }).fail(function()  {
      $("#requestdemomodal .modal-body").html("Sorry - there was an error. Please reload and try again.");
  }).complete(function() {
      $("#requestdemobtn").hide();
  });
}

$(document).ready(function() {
  $( "#requestdemoform" ).submit(function( event ) {
    event.preventDefault();
    sendForm2Slack();
  });
});
