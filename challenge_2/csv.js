/*
 * Variables
*/
var EXCLUDE_DEFAULT = ['children'];
var DEFAULT_HEADERS = ['id', 'parentId'];
var COUNT = 0;

/*
 * Helper functions
*/
var DEFAULT_FUNCTIONS = {
  'id': function() {
    return ++COUNT;
  },
  'parentId': function(prop, obj, parent) {
    return parent.id;
  }
}

var scan = function(obj, cb, parent) {
  cb(obj, parent);
  obj.children.length && obj.children.forEach(function( item ) {
    scan(item, cb, obj);
  });
}



/*
 * CSV Converter
*/
module.exports = function(data) {
  var _headers = {};
  var _data = JSON.parse( data.json );
  var flattenedData = [];

  // extend exclude list with user excludes
  var excludeProps = EXCLUDE_DEFAULT.concat( data.filter.split(',') );

  // exclude any default headers that user asked to be filtered out
  var defaultHeaders = DEFAULT_HEADERS.filter(function( item ) {
    return excludeProps.indexOf( item ) === -1;
  });

  // reset count
  COUNT = 0;

  scan(_data, function(obj, parent) {
    // save all props to a common object

    var currentObjKeys = Object.keys( obj );
  
    for(let i = 0; i < currentObjKeys.length; i++){

      var prop = currentObjKeys[i];
      
      // denie prop if it is in out exlution list
      if( excludeProps.indexOf( prop ) !== -1 ){ continue; }
      
      // save prop
      _headers[ prop ] = true;

    } 
      
    // add default headers and values before convertion
    defaultHeaders.forEach(function(prop) {
      obj[prop] = DEFAULT_FUNCTIONS[ prop ](prop, obj, (parent || {}) );
    });

  });
  
  
  var headers = defaultHeaders.concat( Object.keys(_headers) );

  // save top row headers to csv;    
  var csv = headers.join(',');
  
  scan(_data, function( obj ) {
    
    // generate csv row with obj data
    var rowData = headers.map(function(prop) { return obj[prop] || '' }).join(',');

    csv += '\n' + rowData;

  });

  return csv;
  
};