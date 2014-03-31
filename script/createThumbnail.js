define(['jquery', 'q'], function($, Q){

  return function createThumbnail(source, maxWidth, maxHeight){

    if(typeof maxHeight === 'undefined' || typeof maxWidth === 'undefined'){
      throw new Error('Höhe und/oder Breite nicht angegeben');
    }

    var $canvas = $('<canvas>');
    var context = $canvas.get(0).getContext('2d');

    function getSourceType(source){
      if(source && typeof source.then === 'function'){
        return 'promise';
      }
      if(source && source.toString() === '[object Blob]'){
        return 'blob';
      }
      if($(source).is('canvas, video, img')){
        return 'element';
      }
      return 'unknown';
    }

    function getThumbSize(){
      var x = source.naturalWidth || source.videoWidth || $(source).width();
      var y = source.naturalHeight || source.videoHeight || $(source).height();
      var ratio = x / y;
      var w = maxWidth;
      var h = maxHeight;
      return {
        width: Math.round(w > h * ratio ? h * ratio : w),
        height: Math.round(w > h * ratio ? h : w / ratio)
      };
    }

    function handleElement(source){
      var size = getThumbSize();
      var deferred = Q.defer();
      $canvas.attr(size);
      context.drawImage(source, 0, 0, size.width, size.height);
      $canvas[0].toBlob(function blobCallback(blob){
        deferred.resolve(blob);
      });
      return deferred.promise;
    }

    function handleBlob(source){
      var deferred = Q.defer();
      $('<img>')
        .attr('src', window.URL.createObjectURL(source))
        .on('load', function(evt){
          deferred.resolve(createThumbnail(evt.target, maxWidth, maxHeight));
        });
      return deferred.promise;
    }

    function handlePromise(source){
      return source.then(function(result){
        return createThumbnail(result, maxWidth, maxHeight);
      });
    }

    switch(getSourceType(source)){
      case 'element':
        return handleElement(source);
      case 'blob':
        return handleBlob(source);
      case 'promise':
        return handlePromise(source);
      default:
        return Q.fcall(function(){
          throw new Error('Kann Quelle nicht verarbeiten');
        });
    }

  };

});