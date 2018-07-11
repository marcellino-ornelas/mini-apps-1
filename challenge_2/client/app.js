$(function(){

  var $csvConverter = $('form');
  var $results = $('#results');
  var $json = $('#json');
  var $jsonFile = $('#jsonFile');
  var $fileLoader = $('#fileLoader');
  var csv = new CSV( $results );

  /*
   * CSV View
  */

  function CSV (el){
    this.raw = null;
    this.$el = el;
    this.formatType = 'pretty';
  }

  CSV.prototype._noContent = function() {
    return $('<p>').text('No data to display'); 
  };

  CSV.prototype._toTable = function() {

    if( !this.raw ) {
      return this._noContent();
    }

    var separatedData = this.raw.split('\n');

    var $tableHead = $('<thead><tr></tr></thead>');
    var $tableBody = $('<tbody>');

    var headers = separatedData[0].split(',');

    var $ths = headers.map(function(data) {
      return $('<th>').text( data );
    });
    
    $tableHead.children('tr').append( $ths );

    for (let i = 1; i < separatedData.length; i++) {
      var $tds = separatedData[i].split(',').map(function(data) {
        return $('<td>').text( data );
      });

      var $tr = $('<tr>').append( $tds );

      $tableBody.append( $tr );
    }
      
    return $('<table>').append($tableHead, $tableBody);

  };

  CSV.prototype._toPretty = function() {
    if( !this.raw ) {
      return this._noContent();
    }

    var $sections = this.raw.split('\n').map(function(item){
      return $('<p>').text( item.split(',').join(', ') );
    }); 

    return $sections;

  };

  CSV.prototype._toRaw = function() {
    return this.raw ? this.raw : this._noContent(); 
  };


  CSV.prototype.format = function(type) {
    
    // default to set format Type
    type = type || this.formatType;
    
    // redefine for cases of new formats
    this.formatType = type;

    // prepare for camalcase
    type = type[0].toUpperCase() + type.slice(1);

    this.$el.html( this['_to' + type]() );
    return this;
  };

  CSV.prototype.load = function(csv) {
    // load new csv data
    this.raw = csv;
    
    // format new data 
    this.format();
    return this;
  };


  
  /*
   * helper funtions
  */
  var requestCSV = function(json, cb) {
    // shortcut for post request for csv convertion
    $.post('/csv', JSON.stringify(json), function(data) {
    
      csv.load(data);

      // reset text area
      $json.css('height', 'initial');

      $csvConverter.find('input:not(.exclude-from-form), textarea:not(.exclude-from-form)').each(function() {
        $(this).val('');
      });

    });
  }
  
  // get a files contents
  var readFile = function(file, cb) {
    let reader = new FileReader();
      
    reader.addEventListener('loadend', function(fileContents) {
      // after file is done loading
      cb( reader.result );
    });

    reader.readAsText( file );
  }
  

  /*
   * initialization
  */

  // csv contents will be empty so it will display message for empty data
  csv.format();
  
  // init materialize tabs with custom onShow function
  $('.tabs').tabs({
    onShow: function() {
      // on tab switch change format type
      var formatType = $(this).attr('data-id');
      csv.format( formatType );
    }
  });


  /*
   * Events 
  */
  $fileLoader.on('change', function(event) {
    var useFileLoader = $(this).prop('checked');
    
    //  shortcut for toggling disabled on inputs
    $json.attr('disabled', useFileLoader );
    $jsonFile.attr('disabled', !useFileLoader );

    // toggle hide class from input-field elements
    $json.add($jsonFile).parents('.input-field').toggleClass('hide');

  });

  // form submition
  $csvConverter.on('submit', function(event) {
    
    event.preventDefault();

    var data = $csvConverter.serializeArray();

    // convert seralizedArray to object
    data = data.reduce(function(acc, item) {
      
      acc[ item.name ] = item.value;
      return acc;

    }, {});
    
    // stop empty data from submitting
    if ( !data.fileLoader && !data.json ) {
      return !csv.raw && csv.format();
    }

    if( data.fileLoader ) {
      
      // read file contents
      readFile( $jsonFile[0].files[0], function(fileContents) {

        data.json = fileContents;
        
        requestCSV( data )

      });

    } else {

      requestCSV( data );

    }
    
  }); // submit

});