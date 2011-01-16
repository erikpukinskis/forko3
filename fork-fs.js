exports.fs = require('fs');

exports.fs.fileExists = function(file, callbacks) {
  if (callbacks == null) { callbacks = {} }
  this.stat(file, function(error, stats) {
    exists = !!stats
    if (callbacks[exists]) {
      callbacks[exists].call();
    }
    if (callbacks['both']) {
      callbacks['both'].call(exists); 
    }
  });
}