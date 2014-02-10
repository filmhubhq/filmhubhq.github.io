$(document).ready(function() {
  var $root = $('html, body');
  $('a.animate').click(function(e) {
      var href = $.attr(this, 'href').replace(/^\//,'');
      console.log(href);
      $root.animate({
          scrollTop: $(href).offset().top
      }, 500, function () {
          window.location.hash = href;
      });
      e.preventDefault();
  });  
  $('[data-toggle="popover"]').popover();
  $('a[data-toggle="tooltip"]').tooltip().click(function(e) {
    e.preventDefault();
    //do other stuff when a click happens
  });
});
