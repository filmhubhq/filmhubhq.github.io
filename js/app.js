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
});
