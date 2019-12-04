$(document).ready(function() {
  // animate same-page anchor scroll
  var $root = $('html, body');
  $('a.animate').click(function(e) {
      var href = $.attr(this, 'href').replace(/^\//,'');
      $root.animate({
        scrollTop: $(href).offset().top
      }, 500, function () {
        window.location.hash = href;
      });
      e.preventDefault();
  });

  // init bootstrap popover & tooltip
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip()
  $('a[data-toggle="tooltip"]').click(function(e) {
    e.preventDefault();
  });


  // Lazyload images
  lazyload();

  // custom file input
  bsCustomFileInput.init()
});
