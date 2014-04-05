/*
  Anforderungen
  -------------
  * requestStream() fordert Zugriff auf die Kamera an
  * requestStream() gibt ein Promise zurück
    * wird der Zugriff auf die Kamera gewährt, wird das Promise mit dem
      Stream-Objekt aufgelöst
    * wird der Zugriff auf die Kamera nicht gewährt oder gibt es einen Fehler,
      wirft das Promise mit einem Error rejected
*/

define(['q'], function(Q){

  return function requestStream(){

    var deferred = Q.defer();

    navigator.getUserMedia({
      audio: false,
      video: true
    }, function successCallback(stream){
      var url = window.URL.createObjectURL(stream);
      deferred.resolve(url);
    }, deferred.reject);

    return deferred.promise;

  };

});