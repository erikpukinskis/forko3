exports.fs = require('fs');

exports.fs.fileExists = function(file, callbacks) {
  if (callbacks == null) { callbacks = {} }
  this.stat(file, function(error, stats) {
    if (callbacks[!!stats]) {
      callbacks[!!stats].call();
    }
  });
}