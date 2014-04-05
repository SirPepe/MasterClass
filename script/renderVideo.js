/*
  Anforderungen
  -------------
  * renderVideo(sourceUrl) stellt ein Video bereit, das das unter "sourceUrl"
    hinterlegte Video abspielt
    * ist sourceUrl kein String, wird eine Exception geworfen
  * renderVideo(sourceUrl) gibt ein Promise auf ein abspielbereites
    Video-Element zurück
    * wenn das Video geladen werden kann und das Element einen abspielbereiten
      Zustand erreicht, wird das Promise mit dem Video-Element aufgelöst
    * gibt es mit dem Video ein Problem, wird das Promise mit einem Error
      rejected
*/

define(['jquery', 'q'], function($, Q){

  return function renderVideo(sourceUrl){

    if(typeof sourceUrl !== 'string'){
      throw new Error('Keine gültige Video-URL angegeben ' +
        '("' + typeof sourceUrl + '" statt "string"');
    }

    var deferred = Q.defer();

    $('<video>')
      .attr('src', sourceUrl)
      .on({
        canplay: function onVideoCanPlay(evt){
          deferred.resolve(evt.target);
        },
        error: function onVideoError(err){
          deferred.reject(err);
        }
      });

    return deferred.promise;

  };

});