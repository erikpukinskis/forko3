Forko3
======

A simple HTML hosting and editing server build in Node.js. Part of the [Forkolator](http://forkolator.org) project.

Installation
------------

1. Install [Git](http://git-scm.com/)
2. Install [Node.js](http://nodejs.org/)
3. Install [nginx](http://wiki.nginx.org/Main)
4. Install [CouchDB](http://couchdb.apache.org/)
5. git clone git://github.com/erikpukinskis/forko3.git
6. Add "include /path/to/forko3/nginx.conf;" to your nginx.conf file, inside the http {} block
7. Make sure the port in the nginx.conf corresponds to your running nginx server
8. Reload your nginx conf (sudo kill -HUP `cat /opt/local/var/run/nginx/nginx.pid`)
9. cd forko3
10. Set this.base_path in app.js to wherever you want apps to be stored (We recommend ../apps)
11. Install [node-router](https://github.com/creationix/node-router) and [haml-js](https://github.com/creationix/haml-js) somewhere and set HAML_PATH and ROUTER_PATH in forko3.js. Default is to just git clone them both into ../vendor
12. Run "node forko3.js"
13. Go to http://localhost:8124 to see if it worked!

Things you might want to do:
----------------------------
    
Change the port forko3 runs on (remember to update your nginx.conf accordingly):

    node forko3.js -p 1234