function handleError(message){
  return function(err){
    window.alert(message + ': ' + err.message);
    $('body').addClass('error');
    console.log(err);
  };
}

require(['jquery',
  'q',
  'requestStream',
  'renderVideo',
  'takeScreenshot',
  'createThumbnail'
], function($,
  Q,
  requestStream,
  renderVideo,
  takeScreenshot,
  createThumbnail
){

  var streamPromise = requestStream()
    .then(renderVideo)
    .then(function(video){
      video.play();
      return Q($(video).appendTo('#VideoWrapper'));
    })
    .fail(handleError('Kann Videostream nicht anzeigen'));

  function createGalleryImage(fullBlob, thumbBlob){
    var $wrapper = $('<div>');
    var $link = $('<a>').attr('href', window.URL.createObjectURL(fullBlob));
    var $img = $('<img>').attr('src', window.URL.createObjectURL(thumbBlob));
    var $close = $('<button>').addClass('close').text('x');
    $link.appendTo($wrapper);
    $close.appendTo($wrapper);
    $img.appendTo($link);
    return Q($wrapper);
  }

  function takeScreenshotWithThumbnail(source){
    return takeScreenshot(source)
      .then(function(imgBlob){
        return createThumbnail(imgBlob, 100, 100)
          .then(function(thumbBlob){
            return Q({ full: imgBlob, thumb: thumbBlob });
          });
      });
  }

  streamPromise.then(function($video){
    $('#SnapButton')
      .attr('disabled', false)
      .on('click', function(){
        takeScreenshotWithThumbnail($video)
        .then(function(blobs){
          return createGalleryImage(blobs.full, blobs.thumb);
        })
        .then(function($galleryImage){
          $galleryImage.appendTo('#Gallery');
        })
        .fail(handleError('Konnte Screenshot nicht erstellen'));
      });


  });

  $('#Gallery').on('click', 'button.close', function(evt){
    $(evt.target).parent().remove();
  });

});