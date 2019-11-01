$(document).ready(function() {
  $( "#sendgrid-signup-form" ).submit(function(event) {
    var $form = $( this );
    $form.find("button[type='submit']").html('<i class="fas fa-spinner fa-spin"></i>').attr('disabled',true);
    event.preventDefault();
    $.post( '/.netlify/functions/list-signup', $('#sendgrid-signup-form').serialize() )
      .done(function() {
        $form.find("button[type='submit']").html('Thank you!');
      })
      .fail(function(err) {
        $form.find("button[type='submit']").html('Oops - error');
        console.log(err);
      });
    });
});
