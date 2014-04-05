// Erzeugt einen Error Handler mit fester Nachricht
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

  // Constructorfunktion für Foto-Objekte
  function Photo(fullBlob, thumbBlob){
    this.id = Date.now();
    this.full = fullBlob;
    this.thumb = thumbBlob;
    this.fullUrl = window.URL.createObjectURL(fullBlob);
    this.thumbUrl = window.URL.createObjectURL(thumbBlob);
  }

  // Stream anfragen, als Video einblenden und ein Promise
  // für das Video-Element zurückgeben
  var streamPromise = requestStream()
    .then(renderVideo)
    .then(function(video){
      video.play();
      $(video).appendTo('#VideoWrapper');
      return video;
    })
    .fail(handleError('Kann Videostream nicht anzeigen'));

  // Wenn die App bereit ist, wird der Button aktiviert
  streamPromise
    .then(function(video){
      $('#SnapButton')
        .attr('disabled', false)
        .on('click', function(){
          takePhoto(video)
            .then(createGalleryImage)
            .then(displayGalleryImage)
            .fail(handleError('Konnte Foto nicht anzeigen'));
        });
      });

  function takePhoto(source){
    return takeScreenshot(source).then(function(imgBlob){
      return createThumbnail(imgBlob, 100, 100).then(function(thumbBlob){
        return new Photo(imgBlob, thumbBlob);
      });
    }).fail(handleError('Konnte Foto nicht erstellen'));
  }

  function createGalleryImage(photo){
    var $wrapper = $('<div>');
    var $link = $('<a>').attr('href', photo.fullUrl);
    var $img = $('<img>').attr('src', photo.thumbUrl);
    var $close = $('<button>').addClass('close').text('x');
    $link.appendTo($wrapper);
    $close.appendTo($wrapper);
    $img.appendTo($link);
    return $wrapper;
  }

  function displayGalleryImage($image){
    return $image.appendTo('#Gallery');
  }

  $('#Gallery').on('click', 'button.close', function(evt){
    $(evt.target).parent().remove();
  });

});