// sign up to sendgrid email list
function sendgridSignup() {
  var form = $('#sendgrid-signup');
  // $('#inputSubmit').html("<i class='fa fa-spinner fa-spin'>").attr('disabled',true);
  var email = $("#sendgrid-signup-email").val();
  var type = $('input[name=inputType]:checked', '#sendgrid-signup').val() || "(not specified)";
  $.ajax({
    method: 'POST',
    url: url_atob,
    data: JSON.stringify(message),
    dataType: 'text',
    processData: false,
  }).done(function()  {
    $("#requestdemomodal .modal-body").html("Thank you! The request was successfully sent. We'll contact you asap.");
    $("#requestdemomodal .modal-footer").html('<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>');
  }).fail(function()  {
    $("#requestdemomodal .modal-body").html("Sorry - there was an error. Please reload and try again.");
    $("#requestdemomodal .modal-footer").html('<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>');
  }).complete(function() {
    $("#requestdemobtn").hide();
  });
}

$(document).ready(function() {
  $( "#sendgrid-signup" ).submit(function( event ) {
    event.preventDefault();
    emailSignup();
  });
});
