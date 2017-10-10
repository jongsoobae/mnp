var mongoose = require('mongoose');


var RequestHeader = (function() {

  var schema = mongoose.Schema({
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'request'
    },
    key: String,
    value: String
  });

  return mongoose.model('requestHeader', schema);

})();

module.exports = RequestHeader;
