var mongoose = require('mongoose');


//// STATIC INFO ////
var methods = {
  'get': 'GET',
  'post': 'POST',
  'put': 'PUT',
  'delete': 'DELETE',
  'patch': 'PATCH',
  'head': 'HEAD'
};


var urlregex = ^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$;

var Request = (function(){

  var methodField = {
    type: String,
    validate: [
      {
        validator: function(val) {
          return val in methods;
        },
        msg: 'Method {VALUE} is not defined.'
      }
    ],
  };

  var urlField = {
    type: String,
    validate: [
      {
        validator: function(val) {
          return val.match(urlregex);
        },
        msg: '{VALUE} is not a valid URL.'
      }
    ]
  };

  var schema = mongoose.Schema({
    methods:methodField,
    url:urlField,
    content_type:String,
    payload:String
  });

  return mongoose.model('request', schema);
})();


module.exports = Request;
