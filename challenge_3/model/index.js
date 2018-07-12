var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/checkout-sprint');


module.exports = {
  Order: require('./order')
}