Forko3
======

A simple HTML hosting and editing server build in Node.js. Part of the Forkolator project (http://forkolator.org).

Installation
------------

1. Install node.js (configure, make, make install)
2. Set this.base_path in app.js to wherever you want apps to be stored.
3. Put a sample HTML file at ./s/st/start/index.html in that folder.
4. Install SpiderMonkey a la http://wiki.apache.org/couchdb/Installing_SpiderMonkey
 - note, you may have to apply this patch: https://github.com/janl/couchdbx-core/blob/ff47372552d10df00d74cb7989dfed4a19a6040d/patches/js/patch-jsprf.c
5. Install 
4. Go into src/ and run "node forko3.js"
5. Go to http://localhost:80 to see if it worked