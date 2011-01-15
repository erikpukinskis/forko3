require.paths.unshift('../vendor/node-router/lib', '../vendor/haml-js/lib');
var http = require('http');
var fs = require('fs');
var path = require('path');
var Router = require('node-router');
var Haml = require('haml');

var hostname = 'http://localhost:8124'

var App = function (name) {
  this.name = name;
  this.root = '/Users/erik/projects/forko3/apps';
  
  this.path = function() {
    return path.join(this.root, this.name.substr(0,1), this.name.substr(0,2), this.name + ".html"); 
  }
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
  app = new App('start');
  fs.readFile(app.path(), function (err, data) {
    haml = fs.readFileSync('views/fork.haml', 'utf8')
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(Haml.render(haml, {locals: {app: match, host: hostname, code: data}}));
  });
});

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

