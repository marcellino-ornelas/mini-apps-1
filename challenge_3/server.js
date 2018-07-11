var express = require('express');
var path = require('path');

var app = express();

var assetsPath = path.join(__dirname, 'public');

app.use( 
  express.static( assetsPath )
);


app.listen(3000, function() {
  console.log('server now running on port 3000.....');
});