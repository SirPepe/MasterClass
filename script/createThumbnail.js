/*
  Anforderungen
  -------------
  * createThumbnail(source, maxWidth, maxHeight) erstellt eine verkleinerte
    Version dessen, was auf "source" abgebildet ist
    * sind "source", "maxWidth" oder "maxHeight" nicht angegeben, wird ein
      Error geworfen
    * ist "source" kein Blob oder kein Canvas, Video oder Img-Element, wird ein
      Error geworfen
  * createThumbnail(source, maxWidth, maxHeight) erstellt ein Promise auf einen
    verkleinerten Screenshot von source
    * bei erfolgreichem erstellen des verkleinerten Screenshots wird das Promise
      mit dem Screenshot als Blob-Objekt aufgelöst
      * der Screnshot hat das gleiche Seitenverhältnis wie das Original "source"
      * der Screenshot hat die größtmöglichen Maße, die "maxWidth" und
        "maxHeight" nicht  überschreiten
    * bei Fehler während des Screenshot-Erstellens wird das Promise mit einem
      Error rejected
*/

define(['jquery', 'q'], function($, Q){

  return function createThumbnail(source, maxWidth, maxHeight){

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
        width: Math.round(w > h * r ? h * r : w),
        height: Math.round(w > h * r ? h : w / r)
      };
    }

    function handleElement(source){
      var size = getThumbSize(source);
      var deferred = Q.defer();
      try {
        $canvas.attr(size);
        context.drawImage(source, 0, 0, size.width, size.height);
        $canvas[0].toBlob(function(blob){
          deferred.resolve(blob);
        });
      } catch(err){
        deferred.reject(err);
      }
      return deferred.promise;
    }

    function handleBlob(source){
      var deferred = Q.defer();
      $('<img>')
        .attr('src', window.URL.createObjectURL(source))
        .on('load', function(evt){
          deferred.resolve(createThumbnail(evt.target, maxWidth, maxHeight));
        });
      return deferred.promise;
    }

    switch(getSourceType(source)){
      case 'element':
        return handleElement(source);
      case 'blob':
        return handleBlob(source);
      default:
        throw new Error('Kann Quelle ' + source.toString() +
          ' nicht verarbeiten');
    }

  };

});