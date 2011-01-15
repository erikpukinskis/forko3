var path = require('path'),
  sys = require('sys'),
  exec = require('child_process').exec;
  fs = require('./fork-fs').fs

App = function (params) {
  this.params = params
  this.slug = params.slug;
  this.code = params.code;
  this.parent = params.parent;
  this.base_path = '/Users/erik/projects/forko3/apps';
  this.errors = {}
  
  this.root = function() {
    return path.join(this.base_path, this.slug.substr(0,1), this.slug.substr(0,2), this.slug);
  }
  
  this.path = function() {
    return path.join(this.root(), "index.html"); 
  }
  
  this.url = function() {
    return "/" + this.slug; 
  }
  
  this.validate = function(callback) {

    valid_slug = !!/^[a-z]+$/.exec(params.slug)
    if (!valid_slug) {
      this.errors["slug"] = "Address can only be lowercase letters" 
    }
    app = this;
    fs.stat(this.path(), function(error, stats) {
      exists = !!stats
      if (exists) {
        app.errors["slug"] = "Address is already taken" 
      }
      callback.call(app, valid_slug && !exists);
    });
  }
  
  this.make_dir = function(callback) {
    app = this
    fs.fileExists(app.root(), {false: function() {
      exec("mkdir -p " + app.root(), function (error, stdout, stderr) {
        callback.call(); 
      });  
    }});
  }
  
  this.create = function(callback) {
    app = this;
    this.make_dir(function() {
      app.save(function() {
        callback.call();
      });
    }); 
  }
  
  this.save = function(callback) {
    fs.writeFile(this.path(), this.code, function(error) {
      callback.call();
    });    
  }
  
  this.load = function(callback) {
    app = this
    fs.readFile(this.path(), function (err, data) {
      app.code = data
      callback.call();
    });
  }  
}