$(document).ready(function() {
  var cookie_expire = 3; // days
  var popupDelay = 20; // seconds

  $( "#sendgrid-popup-form" ).submit(function(event) {
    var $form = $( this );
    var $submit = $form.find("button[type='submit']")

    event.preventDefault();
    $submit.html('<i class="fas fa-spinner fa-spin"></i>').attr('disabled',true);
    $.post( $form.attr("action"), $form.serialize() )
      .done(function() {
        $submit.html('Thank you!');
      })
      .fail(function(err) {
        $submit.html('Oops - error');
        console.log(err);
      });
  });

  var cookie = localStorage.getItem("sendgrid-popup-modal");
  if(cookie == undefined || cookie == null) {
    cookie = 0;
  }

  if (((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > cookie_expire) {
    setTimeout(function() {
       $("#sendgrid-popup-modal").modal('show');
      }, popupDelay * 1000);
    localStorage.setItem("sendgrid-popup-modal", (new Date()).getTime());
  }
});
