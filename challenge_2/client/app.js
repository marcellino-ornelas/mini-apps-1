$(function(){

  var $csvConverter = $('form');
  var $results = $('#results');
  var $json = $('#json');
  var filter = $('#filter');
  
  // templates

  /*
   * Events 
  */

  $csvConverter.on('submit', function(event) {
    
    event.preventDefault();

    var data = $csvConverter.serializeArray();

    data = data.reduce()

    $.post('/csv', JSON.stringify({
      
    }), function(data) {

      var $sections = data.split('\n').map(function(item){
        return $('<p>').text( item );
      });
      
      $results.html($sections);
      $json.val('');

    });

  });

});