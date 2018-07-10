$(function(){

  var $csvConverter = $('form');
  var $results = $('#results');
  var $json = $('#json');
  
  // templates

  /*
   * Events 
  */

  $csvConverter.on('submit', function(event) {
    
    event.preventDefault();

    $.post('/csv', JSON.stringify($json.val()), function(data) {

      var $sections = data.split('\n').map(function(item){
        return $('<p>').text( item );
      });
      
      $results.html($sections);
      $json.val('');
      
    });

  });

});