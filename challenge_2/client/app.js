$(function(){

  var $csvConverter = $('form');
  var $results = $('#results');
  var $json = $('#json');
  


  /*
   * Events 
  */

  $csvConverter.on('submit', function(event) {
    
    event.preventDefault();

    $.post('/csv', JSON.stringify($json.val()), function(data) {
      
      $results.text(data);

    });

  });

});