define(['jquery', 'q'], function($, Q){

  return function renderStreamUrl(source){

    var deferred = Q.defer();

    $('<video>')
      .attr('src', source)
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