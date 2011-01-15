require.paths.unshift('../vendor/node-router/lib', '../vendor/haml-js/lib');
var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url'),
  sys = require('sys'),
  querystring = require('querystring'),
  exec = require('child_process').exec;
  Router = require('node-router'),
  Haml = require('haml');

var hostname = 'http://localhost:8124'

http.ServerResponse.prototype.haml = function(view, locals) {
  haml = fs.readFileSync('views/' + view + '.haml', 'utf8');
  this.writeHead(200, {'Content-Type': 'text/html'});
  body = Haml.render(haml, {locals: locals})
  
  template = fs.readFileSync('views/template.haml', 'utf8');
  this.end(Haml.render(template, {locals: {body: body}})); 
}

http.ServerResponse.prototype.redirect_to = function(path) {
  this.writeHead(302, {Location: path});
  this.end(); 
}

fs.fileExists = function(file, callbacks) {
  if (callbacks == null) { callbacks = {} }
  fs.stat(file, function(error, stats) {
    if (callbacks[!!stats]) {
      callbacks[!!stats].call();
    }
  });
 
}

var App = function (params) {
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
      fs.writeFile(app.path(), app.code, function(error) {
        callback.call();
      });
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

var server = Router.getServer();

server.get("/", function (request, response) {
  response.redirect_to("/start");
})

server.get(new RegExp("^/fork/([a-z]*)$"), function (request, response, match) {
  app = new App({slug: match});
  app.parent = match
  
  fs.readFile(app.path(), function (err, data) {
    app.code = data
    response.haml('fork', {host: hostname, app: app, action: 'fork'});
  });
});

server.get(new RegExp("^/edit/([a-z]*)$"), function (request, response, match) {
  app = new App({slug: match});
  app.load(function() {
    response.haml('fork', {host: hostname, app: app, action: 'edit'});
  });
});

server.post('/apps', function(request, response) {
  request.addListener("data", function(data) {
    params = querystring.parse(data);
    app = new App(params)
    app.validate(function(valid) {
      if (valid) {
        app.create(function() {
          response.redirect_to(app.url());
        });
      } else {
        response.haml('fork', {host: hostname, app: app});
      }
    });
  });
});

server.get(new RegExp("^/([a-z]*)$"), function (request, response, match) {
  app = new App({slug: match});
  fs.readFile(app.path(), function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
});

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

