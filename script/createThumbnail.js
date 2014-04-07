/*
  Anforderungen
  -------------
  1.  createThumbnail(source, maxWidth, maxHeight) erstellt eine verkleinerte
      Version dessen, was in "source" abgebildet ist
      1.1 sind "source", "maxWidth" oder "maxHeight" nicht angegeben, wird ein
          Error geworfen
      1.2 ist "source" kein Blob oder kein Canvas, Video oder Img-Element, wird
          ein Error geworfen
  2.  createThumbnail(source, maxWidth, maxHeight) erstellt ein Promise auf
      einen verkleinerten Screenshot von "source"
      2.1 bei erfolgreichem Erstellen des verkleinerten Screenshots wird das
          Promise mit dem Screenshot als Blob-Objekt aufgelöst
          2.1.1 der Screnshot hat das gleiche Seitenverhältnis wie das Original
          "source"
          2.1.2 der Screenshot hat die größtmöglichen Maße, die "maxWidth" und
                "maxHeight" nicht  überschreiten
      2.2 bei Fehler während des Screenshot-Erstellens wird das Promise mit
          einem Error rejected
*/

define(['jquery', 'q'], function($, Q){

  return function createThumbnail(source, maxWidth, maxHeight){

    // 1.1 Exception mangels Quelle, Breite oder Höhe
    if(typeof source === 'undefined'){
      throw new Error('Keine Thumbnail-Quelle angegeben');
    }
    if(typeof maxHeight === 'undefined' || typeof maxWidth === 'undefined'){
      throw new Error('Höhe und/oder Breite nicht angegeben');
    }

    var $canvas = $('<canvas>');
    var context = $canvas.get(0).getContext('2d');
    source = $(source).get(0);

    function getSourceType(source){
      if(source && source.toString() === '[object Blob]'){
        return 'blob';
      }
      if($(source).is('canvas, video, img')){
        return 'element';
      }
      return 'unknown';
    }

    // 2.1.1 und 2.1.2 Bildgröße
    function getThumbSize(source){
      var x = source.naturalWidth ||    // Bild
              source.videoWidth ||      // Video
              $(source).attr('width');  // Canvas
      var y = source.naturalHeight ||   // Bild
              source.videoHeight ||     // Video
              $(source).attr('height'); // Canvas
      var r = x / y;
      var w = maxWidth;
      var h = maxHeight;
      return {
        width: Math.round(w > h * r ? h * r : w) || 0,
        height: Math.round(w > h * r ? h : w / r) || 0
      };
    }

    function handleElement(source){
      var size = getThumbSize(source);
      var deferred = Q.defer();
      try {
        $canvas.attr(size);
        context.drawImage(source, 0, 0, size.width, size.height);
        $canvas[0].toBlob(function(blob){
          deferred.resolve(blob); // 2.1 Promise mit Blob auflösen
        });
      } catch(err){
        deferred.reject(err); // 2.2 Im Fehlerfall Promise rejecten
      }
      return deferred.promise;
    }

    function handleBlob(source){
      var deferred = Q.defer();
      $('<img>')
        .attr('src', window.URL.createObjectURL(source))
        .on('load', function(evt){
          // Promise mit Promise auflösen
          deferred.resolve(createThumbnail(evt.target, maxWidth, maxHeight));
        });
      return deferred.promise;
    }

    switch(getSourceType(source)){
      case 'element':
        return handleElement(source); // 2. Promise zurückgeben
      case 'blob':
        return handleBlob(source);    // 2. Promise zurückgeben
      default:
        // 1.2 Error bei ungültiger Quellle
        throw new Error('Kann Quelle ' + source.toString() +
          ' nicht verarbeiten');
    }

  };

});