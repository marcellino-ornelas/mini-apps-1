const express = require('express');
const path = require('path')

const app = express();

app.use( express.static(path.join(__dirname,'client/')) );

// home made body
app.use( bodyParser );

app.get('/', function(req, res) {
  
  res.sendFile( path.join(__dirname,'client/index.html') )

});

app.post('/csv', function(req, res) {
  console.log(req.body)
  res.send('you hit me');
});

app.listen(3000,function() {
  console.log('SERVER IS NOW RUNNING ON PORT 3000');
});

function bodyParser(req,res,next) {

  var requestedData = '';
  
  req.on('data', function(chunk) {
    requestedData += chunk;
  });

  req.on('end', function() {
    req.body = JSON.parse(requestedData);
    next();
  });

}
