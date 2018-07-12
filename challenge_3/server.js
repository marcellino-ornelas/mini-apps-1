var express = require('express');
var path = require('path');
var parser = require('body-parser');
var session = require('express-session')
var db = require('./model');

var app = express();

var assetsPath = path.join(__dirname, 'public');

// console.log(db.Order.collection.drop())

app.use(function(req,res,next) {
  
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();

});

app.use( 
  express.static( assetsPath )
);

app.use(parser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000000
  }
}));


// reject data if they didnt complete first step
app.use(/^\/f[1-3]/, function(req,res,next) {
  if( req.session.mongo_user_id ) {
    next();
  } else {
    console.log('redirect');
    res.send({err: 'no access' })
  }
});

app.use(function(req,res,next) {

  db.Order
    .findById( req.session.mongo_user_id )
    .exec()
    .then(function(order) {

      if (order) {
        req.order = order;
      }

      next();
    })
    .catch((err) => next(err) );

})

app.post('/f0', function(req, res, next) {
  //  create new order
  var data = req.body;

  var order = new db.Order();

  order
    .save()
    .then(function(order){
      req.session.mongo_user_id = order.id

      res.send({ created: true, id: order.id });
    })
    .catch(function(err) {
      next(err);
    });

});

app.post('/f1',function(req, res) {
  // save user info
  var data = req.body;
  // console.log(req.session.mongo_user_id)
  console.log(req.order)
  
  res.send({hey:'hey'})

});

app.post('/f2', function(req, res) {
  // save user address info
  var data = req.body;

  res.send(req.body);
});

app.post('/f3', function(req, res) {
  // save user billing info
  var data = req.body;

  res.send(req.body);
});


app.use(function(err,req,res,next) {
  console.log(err);
  res.status(505).send('Internal server err')
})


app.listen(3000, function() {
  console.log('server now running on port 3000.....');
});