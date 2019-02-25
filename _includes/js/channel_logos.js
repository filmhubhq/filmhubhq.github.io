$(document).ready(function() {
  var mixer = mixitup('#channel-logos', {
    animation: {
      enable: false
    }
  });
  var buttons = $('#channel-logos [data-toggle~=button]')
  buttons.on('click', function( ) {
    buttons.removeClass('active')
  })
});
