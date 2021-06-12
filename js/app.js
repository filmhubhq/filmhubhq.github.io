---
---
$(function() {
  // animate same-page anchor scroll
  var $root = $('html, body');
  $('a.animate').on('click', function(e) {
      var href = $.attr(this, 'href').replace(new RegExp('^\/'),'');
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
  $('a[data-toggle="tooltip"]').on('click', function(e) {
    e.preventDefault();
  });

  // Image Resize Handler
  const imageProps = ({ width, height, key, crop = true }) => ({
    bucket: "{{ site.image_bucket }}", key,
    edits: {
      resize: { width, height, fit: crop ? 'cover' : 'inside' },
      toFormat: 'jpeg',
      jpeg: { quality: 60 },
    },
  })

  // Setting image URLs with proper formatting for resizing
  $('[data-image-filename]').each((_, img) => {
    const width = Number(img.getAttribute('width'))
    const height = Number(img.getAttribute('height'))
    const key = img.dataset.imageFilename

    const image1x = btoa(JSON.stringify(imageProps({ width, height, key })))
    const image2x = btoa(JSON.stringify(imageProps({ width: width * 2, height: height * 2, key })))

    img.srcset = `
      {{ site.image_cdn }}/${image1x} 1x,
      {{ site.image_cdn }}/${image2x} 2x
    `
  })
});
