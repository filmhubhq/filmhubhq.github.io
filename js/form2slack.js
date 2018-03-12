// send contact form to Slack
function sendForm2Slack() {
  $('#inputSubmit').html("<i class='fa fa-spinner fa-spin'>");
  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var phone = $("#inputPhone").val();
  var text = 'Another demo request from our website!\nFirst name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone;
  var closeBtn =
    '<div class="modal-footer"> \
      <button type="button" class="btn btn-default" data-dismiss="modal">\
        Close\
      </button>\
    </div>';
  $.ajax({
    method: 'POST',
    url: "https://hooks.slack.com/services/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",
    data: JSON.stringify({ "text": text }),
    dataType: 'text',
    processData: false,
  }).done(function(data)  {
      $("#requestdemomodal .modal-body").html("Thank you! The request was successfully sent. We'll contact you asap.").after(closeBtn);
  }).fail(function()  {
      $("#requestdemomodal .modal-body").html("Sorry - there was an error. Please reload and try again.").after(closeBtn);
  }).complete(function() {
      $("#requestdemobtn").hide();
  });
}

$(document).ready(function() {
  $( "#requestdemoform" ).submit(function( event ) {
    event.preventDefault();
    sendForm2Slack();
  });
})
