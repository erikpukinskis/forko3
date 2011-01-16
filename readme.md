Forko3
======

A simple HTML hosting and editing server build in Node.js. Part of the [Forkolator](http://forkolator.org) project.

Installation
------------

1. Install [Git](http://git-scm.com/)
2. Install [Node.js](http://nodejs.org/)
3. git clone git://github.com/erikpukinskis/forko3.git
4. cd forko3
5. Set this.base_path in app.js to wherever you want apps to be stored (We recommend ../apps)
6. Install [node-router](https://github.com/creationix/node-router) and [haml-js](https://github.com/creationix/haml-js) somewhere and make set HAML_PATH and ROUTER_PATH in forko3.js. Default is to just git clone them both into ../vendor
7. Run "node forko3.js"
8. Go to http://localhost:8124 to see if it worked!

If you tweak your nginx configuration and want to reload it, use (the exact path will vary from platform to platform):

    sudo kill -HUP `cat /opt/local/var/run/nginx/nginx.pid`
    
Command line flags
------------------

Set the port: 

    node forko3.js -p 1234