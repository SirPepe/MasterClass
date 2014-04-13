require(['jquery', 'q', 'handleError',
  'requestStream', 'renderVideo', 'takeScreenshot', 'createThumbnail'
], function($, Q, handleError,
  requestStream, renderVideo, takeScreenshot, createThumbnail
){

  // Constructorfunktion für Foto-Objekte
  function Photo(fullBlob, thumbBlob){
    this.id = Date.now();
    this.full = fullBlob;
    this.thumb = thumbBlob;
    this.fullUrl = window.URL.createObjectURL(fullBlob);
    this.thumbUrl = window.URL.createObjectURL(thumbBlob);
  }

  // Hier geht es weiter!

});