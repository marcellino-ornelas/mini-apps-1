var express = require('express');
var path = require('path');

var app = express();

var assetsPath = path.join(__dirname, 'public');

app.use( 
  express.static( assetsPath )
);

app.post('/f0', function(req, res) {

});

app.post('/f1',function(req, res) {

});

app.post('/f2', function(req, res) {

});

app.post('/f3', function(req, res) {

});


app.listen(3000, function() {
  console.log('server now running on port 3000.....');
});