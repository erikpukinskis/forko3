exports.http = require('http');

var fs = require('./fork-fs').fs,
  querystring = require('querystring'),
  Haml = require('haml');

exports.http.ServerResponse.prototype.haml = function(view, locals) {
  haml = fs.readFileSync('views/' + view + '.haml', 'utf8');
  this.writeHead(200, {'Content-Type': 'text/html'});
  body = Haml.render(haml, {locals: locals})
  
  template = fs.readFileSync('views/template.haml', 'utf8');
  this.end(Haml.render(template, {locals: {body: body}})); 
}

exports.http.ServerResponse.prototype.redirect_to = function(path) {
  this.writeHead(302, {Location: path});
  this.end(); 
}

exports.http.IncomingMessage.prototype.getParams = function(callback) {
  this.addListener("data", function(data) {
    params = querystring.parse(data);
    callback.call(this, params);
  });
}
