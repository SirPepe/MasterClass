define(['jquery', 'q'], function($, Q){

  return function takeScreenshot(source){

    var deferred = Q.defer();

    var $canvas = $('<canvas>');
    var context = $canvas[0].getContext('2d');

    if(!$(source).is('canvas, video, img')){
      var err = new Error('Kann Quelle nicht verarbeiten');
      deferred.reject(err);
    }

    else {
      $canvas.attr('width', $(source).width());
      $canvas.attr('height', $(source).height());
      context.drawImage(source, 0, 0);
      $canvas[0].toBlob(function blobCallback(blob){
        deferred.resolve(blob);
      });
    }

    return deferred.promise;

  };

});