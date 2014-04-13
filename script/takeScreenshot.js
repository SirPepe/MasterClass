/*
  Anforderungen
  -------------
  1.   takeScreenshot(quelle) erstellt einen Screenshot des Elements "quelle"
       1.1 wird "quelle" nicht angegeben, wirft die Funktion einen Error
       1.2 ist "quelle" kein Canvas-, Img-, oder Video-Element, wirft die
           Funktion einen Error
  2.   takeScreenshot(quelle) gibt ein Promise zurück
       2.1 bei erfolgreichem Screenshot wird das Promise mit dem Screenshot als
           Blob-Objekt aufgelöst
           2.1.1 der Screenshot hat die gleichen Maße wie die in "quelle"
                 verwendete Datei (Bild, Video) bzw. das Element "quelle" selbst
                 (z.B. bei Canvas-Elementen)
       2.2 bei Fehler während des Screenshot-Erstellens wird das Promise mit
           einem Error rejected
*/

define(['jquery', 'q'], function($, Q){

  return function takeScreenshot(source){

    // 1.1 Exception mangels Quelle
    if(typeof source === 'undefined'){
      throw new Error('Keine Screenshot-Quelle angegeben');
    }

    // 1.2 Exception wegen ungültiger Quelle
    if(!$(source).is('canvas, video, img')){
      throw new Error('Kann Quelle nicht verarbeiten');
    }

    var deferred = Q.defer();
    var $canvas = $('<canvas>');
    var context = $canvas.get(0).getContext('2d');

    // 2.1.1 Canvas auf die Maße des Quell-Elements bringen
    var sourceWidth =  $(source).get(0).naturalWidth ||  // Bild
                       $(source).get(0).videoWidth ||    // Video
                       $(source).attr('width');          // Canvas
    var sourceHeight = $(source).get(0).naturalHeight || // Bild
                       $(source).get(0).videoHeight ||   // Video
                       $(source).attr('height');         // Canvas
    $canvas.attr({
      width: sourceWidth,
      height: sourceHeight
    });

    try {
      context.drawImage($(source).get(0), 0, 0);
      $canvas.get(0).toBlob(deferred.resolve); // 2.1 Promise mit Blob auflösen
    } catch(e){
      deferred.reject(e); // 2.2 Promise mit Fehler rejecten
    }

    // 2. Promise wird zurückgegeben
    return deferred.promise;

  };

});