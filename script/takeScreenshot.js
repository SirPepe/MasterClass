/*
  Anforderungen
  -------------
  * takeScreenshot(quelle) erstellt einen Screenshot des Elements "quelle"
    * wird "quelle" nicht angegeben, wirft die Funktion einen Error
  * takeScreenshot(quelle) gibt ein Promise zurück
    * ist "quelle" kein Canvas-, Img-, oder Video-Element, wird das Promise mit
      einem Error rejected
    * bei erfolgreichem Screenshot wird das Promise mit dem Screenshot als
      Blob-Objekt aufgelöst
    * der Screenshot hat die gleichen Maße wie das Element "quelle"
*/

define(['jquery', 'q'], function($, Q){

  return function takeScreenshot(source){

    if(typeof source === 'undefined'){
      throw new Error('Keine Screenshot-Quelle angegeben');
    }

    var deferred = Q.defer();
    var $canvas = $('<canvas>');
    var context = $canvas.get(0).getContext('2d');

    if(!$(source).is('canvas, video, img')){
      var err = new Error('Kann Quelle nicht verarbeiten');
      deferred.reject(err);
    }

    else {

      var sourceWidth = $(source).get(0).naturalWidth ||
        $(source).get(0).videoWidth ||
        $(source).attr('width');
      var sourceHeight = $(source).get(0).naturalHeight ||
        $(source).get(0).videoHeight ||
        $(source).attr('height');

      $canvas.attr({
        width: sourceWidth,
        height: sourceHeight
      });

      context.drawImage($(source).get(0), 0, 0);
      $canvas.get(0).toBlob(function blobCallback(blob){
        deferred.resolve(blob);
      });

    }

    return deferred.promise;

  };

});