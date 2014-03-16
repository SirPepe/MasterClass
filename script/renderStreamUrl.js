define(['jquery', 'q'], function($, Q){

  return function renderStreamUrl(source){

    var deferred = Q.defer();

    var render = function(url){
      var $video = $('<video>').attr('src', url);
      $video.on({
        canplay: function onVideoCanPlay(){
          $video[0].play();
          deferred.resolve($video);
        },
        error: function onVideoError(err){
          deferred.reject(err);
        }
      });
    };

    if(typeof source === 'string'){
      render(source);
    }
    else if(source && typeof source.then === 'function'){
      source.then(render, function errorCallback(err){
        deferred.reject(err);
      });
    }
    else {
      var err = 'Kann Quelle nicht verarbeiten';
      deferred.reject(err);
    }

    return deferred.promise;

  };

});