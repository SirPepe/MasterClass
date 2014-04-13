define(function(){
  return function handleError(message){
    return function(err){
      var msg = message + "\n" + err.name;
      if(err.message){
        msg += ': ' + err.message;
      }
      window.alert(msg);
      $('body').addClass('error');
      console.dir(err);
    };
  };
});