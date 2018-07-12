var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;


var orderSchema = new Schema({
  name: { type: String },
  email: { type: String }, 
  password: { type: String }, 
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  number: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },
  billingZipCode: { type: String }
});


var Order = mongoose.model('Order', orderSchema );

module.exports = Order;