Forko3
======

A simple HTML hosting and editing server build in Node.js. Part of the Forkolator project (http://forkolator.org).

Installation
------------

1. Install [Node.js](http://nodejs.org/)
2. Set this.base_path in app.js to wherever you want apps to be stored (We recommend src/../apps)
3. Install [node-router](https://github.com/creationix/node-router) and [haml-js](https://github.com/creationix/haml-js) somewhere and make set HAML_PATH and ROUTER_PATH in forko3.js. Default is to just git clone them both into ../vendor
3. Go into src/ and run
     node forko3.js
4. Go to http://localhost:8124 to see if it worked!

Command line flags
------------------

Set the port: 

    node forko3.js -p 1234