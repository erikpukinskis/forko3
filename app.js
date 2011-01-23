var path = require('path'),
  sys = require('sys'),
  exec = require('child_process').exec;
  fs = require('./fork-fs').fs

App = function (params) {
  this.params = params
  this.slug = params.slug;
  this.code = params.code;
  this.parent = params.parent;
  this.base_path = '../apps';
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
    var valid_slug = !!/^[a-z]+$/.exec(this.slug)
    if (!valid_slug) {
      this.errors["slug"] = "Address can only be lowercase letters" 
    }
    
    var reserved = ['edit', 'fork', 'couchdb'].indexOf(this.slug) != -1
    if (reserved) {
      this.errors["slug"] = "Address is reserved" 
    }
    
    var app = this;  
    fs.fileExists(this.root(), {
      true: function() {
        app.errors["slug"] = "Address is already taken" 
      },
      both: function(exists) {
        callback.call(app, valid_slug && !exists && !reserved);    
      }
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
        if (callback) { callback.call(); }
      });
    }); 
  }
  
  this.save = function(callback) {
    fs.writeFile(this.path(), this.code, function(error) {
      if (callback) { callback.call(); }
    });    
  }
  
  this.load = function(callback) {
    app = this
    fs.readFile(this.path(), function (err, data) {
      app.code = data
      callback.call();
    });
  }  
  
  this.escapedCode = function() {
    return this.code.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); 
  }
}