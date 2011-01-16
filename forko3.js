require.paths.unshift('../vendor/node-router/lib', '../vendor/haml-js/lib');
var http = require('./fork-http').http,
  fs = require('./fork-fs').fs,
  path = require('path'),
  url = require('url'),
  Router = require('node-router'),
  Haml = require('haml');

require('./app');
var hostname = 'http://localhost:8124'


var server = Router.getServer();

server.get("/", function (request, response) {
  response.haml('home');
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
  request.getParams(function(params) {
    app = new App(params)
    app.validate(function(valid) {
      if (valid) {
        app.create(function() {
          response.redirect_to(app.url());
        });
      } else {
        response.haml('fork', {host: hostname, app: app, action: 'fork'});
      }
    });
  });
});

server.post(new RegExp("^/([a-z]*)$"), function(request, response, match) {
  request.getParams(function(params) {
    app = new App({slug: match})
    app.code = params['code']
    app.save(function() {
      response.redirect_to(app.url());
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

