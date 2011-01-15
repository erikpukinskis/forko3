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

var App = function (name) {
  this.name = name;
  this.root = '/Users/erik/projects/forko3/apps';
  
  this.path = function() {
    return path.join(this.root, this.name.substr(0,1), this.name.substr(0,2), this.name + ".html"); 
  }
}

http.ServerResponse.prototype.haml = function(view, locals) {
  haml = fs.readFileSync('views/' + view + '.haml', 'utf8');
  this.writeHead(200, {'Content-Type': 'text/html'});
  this.end(Haml.render(haml, {locals: locals})); 
}

var server = Router.getServer();

server.get("/", function (request, response) {
  app = new App('start')
  fs.readFile(app.path(), function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
})

server.get(new RegExp("^/fork/([a-z]*)$"), function (request, response, match) {
  app = new App(match);
  app.parent = match
  fs.readFile(app.path(), function (err, data) {
    app.code = data
    response.haml('fork', {host: hostname, app: app});
  });
});

server.post('/apps', function(request, response) {
  request.addListener("data", function(data) {
    params = querystring.parse(data);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(.parent);
  });
});

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

