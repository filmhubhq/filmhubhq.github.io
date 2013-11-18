var $root = $('html, body');
$('a').click(function(e) {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top - 50
    }, 500, function () {
        window.location.hash = href;
    });
    // $('.nav li').removeClass('active');
    // var $parent = $(this).parent();
    // if (!$parent.hasClass('active')) {
    //   $parent.addClass('active');
    // }      
    e.preventDefault();
});