
var scan = function(obj, cb) {
  cb(obj);
  obj.children.length && obj.children.forEach(function( item ) {
    scan(item, cb);
  });
}

var EXCLUDE = ['children'];

module.exports = function(jsonData) {
  var _headers = {};
  var _data = JSON.parse( jsonData );
  var flattenedData = [];

  scan(_data, function(obj) {
    var currentObjKeys = Object.keys( obj );
  
    for(let i = 0; i < currentObjKeys.length; i++){

      var prop = currentObjKeys[i];

      if( EXCLUDE.indexOf( prop ) !== -1 ){ continue; }
      
      _headers[ prop ] = true;

    }   

  });

  var headers = Object.keys(_headers);
  var csv = headers.join(',');
  
  scan(_data, function( obj ) {

    csv += '\n' + headers.map(function(prop) { return obj[prop] }).join(',');

  });

  return csv;
  
};