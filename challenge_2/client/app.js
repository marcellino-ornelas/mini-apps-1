$(function(){

  var $csvConverter = $('form');
  var $results = $('#results');
  var $json = $('#json');
  


  /*
   * Events 
  */

  $csvConverter.on('submit', function(event) {
    
    event.preventDefault();



    $.post('/csv', $json.val(), function(data) {
      
      console.log('we hit home base');

    });

  });

});