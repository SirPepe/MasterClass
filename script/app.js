require(['jquery', 'requestStreamUrl', 'renderStreamUrl'],
  function($, requestStreamUrl, renderStreamUrl){

  function handleError(){
    $('#VideoWrapper').addClass('fail');
    console.error(err);
  }

  requestStreamUrl()
    .then(renderStreamUrl)
    .then(function($video){
      $video.appendTo('#VideoWrapper');
      $('#SnapButton').attr('disabled', false);
    }, handleError);

  $('#SnapButton').on('click', function(){

  });

});