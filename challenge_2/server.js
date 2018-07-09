const express = require('express');
const path = require('path')

const app = express();

app.use( express.static(__dirname + '/client') )

app.get('/', function(req, res) {
  
  res.sendFile( path.join(__dirname,'client/index.html') )

});

app.post('/csv', function(req, res) {
  res.send('you hit me')
});

app.listen(3000,function() {
  console.log('SERVER IS NOW RUNNING ON PORT 3000');
});