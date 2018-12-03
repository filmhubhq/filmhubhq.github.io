$(document).ready(function() {
  var mixer = mixitup('#channel-logos');
  var buttons = $('#channel-logos [data-toggle~=button]')
  buttons.on('click', function( ) {
    buttons.removeClass('active')
  })
});
