require.paths.unshift('../vendor/node-router/lib', '../vendor/haml-js/lib');
var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url'),
  sys = require('sys'),
  querystring = require('querystring'),
  Router = require('node-router'),
  Haml = require('haml');

var hostname = 'http://localhost:8124'

var App = function (params) {
  this.params = params
  this.slug = params.slug;
  this.code = params.code;
  this.parent = params.parent;
  this.root = '/Users/erik/projects/forko3/apps';
  
  this.path = function() {
    return path.join(this.root, this.slug.substr(0,1), this.slug.substr(0,2), this.slug + ".html"); 
  }
  
  this.validate = function(callback) {
    valid_slug = !!/^[a-z]+$/.exec(params.slug)
    app = this;
    fs.stat(this.path(), function(error, stats) {
      exists = !!stats
      callback.call(app, valid_slug && !exists);
    });
  }
}

http.ServerResponse.prototype.haml = function(view, locals) {
  haml = fs.readFileSync('views/' + view + '.haml', 'utf8');
  this.writeHead(200, {'Content-Type': 'text/html'});
  this.end(Haml.render(haml, {locals: locals})); 
}

var server = Router.getServer();

server.get("/", function (request, response) {
  app = new App({slug: 'start'})
  fs.readFile(app.path(), function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
})

server.get(new RegExp("^/fork/([a-z]*)$"), function (request, response, match) {
  app = new App({slug: match});
  app.parent = match
  fs.readFile(app.path(), function (err, data) {
    app.code = data
    response.haml('fork', {host: hostname, app: app});
  });
});

server.post('/apps', function(request, response) {
  request.addListener("data", function(data) {
    params = querystring.parse(data);
    app = new App(params)
    /*if app.isValid() {
      app.create();
    }*/
    app.validate(function(valid) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end( sys.inspect( valid ));
    });
  });
});

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
