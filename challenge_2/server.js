const express = require('express');
const path = require('path');

const csv = require('./csv');

const app = express();

app.use( express.static(path.join(__dirname,'client/')) );

// home made body
app.use( bodyParser );

app.post('/csv', function(req, res, next) {
  var data;
  console.log('data', req.body)
  try {
    data = csv(req.body);
  } catch(e) {
    console.log(e)
    next( new Error("Invalid json value") );
  }
  
  res.send( data );
});



app.use(function(err,req,res,next){
  console.log('err: ', err)
  res.statusMessage = err.message;
  res.status(505).send( err );
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
