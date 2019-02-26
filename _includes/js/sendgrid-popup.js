$(document).ready(function() {

  $( "#sendgrid-popup-form" ).submit(function(event) {
    event.preventDefault();

    var $form = $( this );

    $form.find("button[type='submit']").html('<i class="fas fa-spinner fa-spin"></i>').attr('disabled',true);
    $.post( $form.attr("action"), $form.serialize() )
      .done(function() {
        $form.find("button[type='submit']").html('Thank you!');
      })
      .fail(function(err) {
        $form.find("button[type='submit']").html('Oops - error');
        console.log(err);
      });
  });

  var cookie_expire = 0; // days
  var cookie = localStorage.getItem("sendgrid-popup-modal");
  if(cookie == undefined || cookie == null) {
    cookie = 0;
  }

  if (((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > cookie_expire) {
    console.log(cookie);
    setTimeout(function() {
       $("#sendgrid-popup-modal").modal('show');
      }, 10000);
    localStorage.setItem("sendgrid-popup-modal", (new Date()).getTime());

    // $("#sendgrid-popup-submit").click(() => {
    //   $.ajax({
    //     type: "POST",
    //     url: $("#popup-form").attr("action"),
    //     data: $("#popup-form").serialize(),
    //     success: (data) => {
    //       $("#popup-box-content").html("<p style='text-align: center'>Thank you for subscribing to The Polyglot Developer newsletter!</p>");
    //     }
    //   });
    // });
  }
});
