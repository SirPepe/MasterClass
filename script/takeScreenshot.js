/*
  Anforderungen
  -------------
  * takeScreenshot(quelle) erstellt einen Screenshot des Elements "quelle"
    * wird "quelle" nicht angegeben, wirft die Funktion einen Error
    * ist "quelle" kein Canvas-, Img-, oder Video-Element, wirft die Funktion
      einen Error
  * takeScreenshot(quelle) gibt ein Promise zurück
    * bei erfolgreichem Screenshot wird das Promise mit dem Screenshot als
      Blob-Objekt aufgelöst
      * der Screenshot hat die gleichen Maße wie das Element "quelle"
    * bei Fehler während des Screenshot-Tests wird das Promise mit einem Error
      rejected
*/

define(['jquery', 'q'], function($, Q){

  return function takeScreenshot(source){

    if(typeof source === 'undefined'){
      throw new Error('Keine Screenshot-Quelle angegeben');
    }

    if(!$(source).is('canvas, video, img')){
      throw new Error('Kann Quelle nicht verarbeiten');
    }

    var deferred = Q.defer();
    var $canvas = $('<canvas>');
    var context = $canvas.get(0).getContext('2d');


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

    try {
      context.drawImage($(source).get(0), 0, 0);
      $canvas.get(0).toBlob(function(blob){
        deferred.resolve(blob);
      });
    } catch(e){
      deferred.reject(e);
    }

    return deferred.promise;

  };

});