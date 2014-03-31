define(['q'], function(Q){

  return function requestStreamUrl(){

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