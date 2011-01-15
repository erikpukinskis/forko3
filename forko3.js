require.paths.unshift('../vendor/node-router/lib', '../vendor/haml-js/lib');
var http = require('http');
var fs = require('fs');
var path = require('path');
var Router = require('node-router');
var Haml = require('haml');

var appPath = '/Users/erik/projects/forko3/apps';

var server = Router.getServer();

server.get("/", function (request, response) {
  var startAppPath = path.join(appPath, "s/st/start.html");
  fs.readFile(startAppPath, function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
})

server.get(new RegExp("^/fork/([a-z]*)$"), function (request, response, match) {
  haml = fs.readFileSync('views/fork.haml', 'utf8')
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(Haml.render(haml));
});

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');