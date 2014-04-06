/*
  Anforderungen
  -------------
  1.  renderVideo(sourceUrl) stellt ein Video-Element bereit, das das unter
      "sourceUrl" hinterlegte Video abspielen kann
      1.1 ist "sourceUrl" kein String, wird ein Error-Objekt geworfen
  2.  renderVideo(sourceUrl) gibt ein Promise auf ein abspielbereites
      Video-Element zurück
      2.1 wenn das Video geladen werden kann und das Element einen
          abspielbereiten Zustand erreicht, wird das Promise mit dem
          Video-Element aufgelöst
      2.2 gibt es mit dem Video ein Problem, wird das Promise mit einem Error
          rejected
*/

define(['jquery', 'q'], function($, Q){

  return function renderVideo(sourceUrl){

    // 1.1 Exception bei ungültigen Quellangaben
    if(typeof sourceUrl !== 'string'){
      throw new Error('Keine gültige Video-URL angegeben ' +
        '("' + typeof sourceUrl + '" statt "string"');
    }

    var deferred = Q.defer();

    $('<video>').attr('src', sourceUrl).on({

        // 2.1 Promise mit Video-Element auflösen, sobald es abspielbereit ist
        canplay: function onVideoCanPlay(evt){
          deferred.resolve(evt.target);
        },

        // 2.2 Promise im Fehlerfall rejecten
        error: deferred.reject

      });

    // 2. Promise zurückgeben
    return deferred.promise;

  };

});