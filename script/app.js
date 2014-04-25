require(['jquery', 'q', 'handleError',
  'requestStream', 'renderVideo', 'takeScreenshot', 'createThumbnail'
], function($, Q, handleError,
  requestStream, renderVideo, takeScreenshot, createThumbnail
){

  // Constructorfunktion für Foto-Objekte
  function Photo(fullBlob, thumbBlob){
    this.id = Date.now();
    this.full = fullBlob;
    this.thumb = thumbBlob;
    this.fullUrl = window.URL.createObjectURL(fullBlob);
    this.thumbUrl = window.URL.createObjectURL(thumbBlob);
  }

  // Stream anfragen, als Video einblenden und Video zurückgeben
  var videoPromise = requestStream()
    .then(renderVideo)
    .then(function(video){
      $(video).appendTo('#VideoWrapper');
      video.play();
      return video;
    })
    .fail(handleError('Kann Videostream nicht anzeigen'));

  // Wenn das Video bereit ist, wird der Button aktiviert
  videoPromise.then(function(video){
    $('#SnapButton')
      .attr('disabled', false)
      .on('click', function(){
        // Foto aufnehmen und anzeigen
        takePhoto(video)
          .then(createGalleryImage)
          .then(displayGalleryImage)
          .fail(handleError('Konnte Foto nicht anzeigen'));
      });
    });

  // Screenshot und Thumbnail erstellen, Photo-Objekt zurückgeben
  function takePhoto(source){
    return Q.all([
      takeScreenshot(source),
      createThumbnail(source, 100, 100)
    ])
    .spread(function(full, thumb){
      return new Photo(full, thumb);
    })
    .fail(handleError('Konnte Foto nicht erstellen'));
  }

  // Photo-Objekt als jQuery-DOM-Objekt für die Galerie aufbereiten
  function createGalleryImage(photo){
    var $wrapper = $('<div>');
    var $link = $('<a>').attr('href', photo.fullUrl);
    var $img = $('<img>').attr('src', photo.thumbUrl);
    var $close = $('<button>').addClass('close fab fa-times');
    $link.appendTo($wrapper);
    $close.appendTo($wrapper);
    $img.appendTo($link);
    return $wrapper;
  }

  // jQuery-DOM-Objekt in die Galerie einhängen
  function displayGalleryImage($image){
    return $image.appendTo('#Gallery');
  }

  // Bilder aus der Galerie löschen
  $('#Gallery').on('click', 'button.close', function(evt){
    $(evt.target).parent().remove();
  });

});