const express = require('express');
const path = require('path')

const app = express();

app.get('/', function(req, res) {
  
  res.sendFile( path.join(__dirname,'client/index.html') )

});

app.get('/csv', function(req, res) {

});

app.listen(3000,function() {
  console.log('SERVER IS NOW RUNNING ON PORT 3000');
});