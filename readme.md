Forko3
======

A simple HTML hosting and editing server build in Node.js. Part of the [Forkolator](http://forkolator.org) project.

Installation
------------

1. Install [Git](http://git-scm.com/)
2. Install [Node.js](http://nodejs.org/) (Stable version 2010.12.30 tested)
3. Install [CouchDB](http://couchdb.apache.org/)
4. Install [nginx](http://wiki.nginx.org/Main)
5. git clone git://github.com/erikpukinskis/forko3.git
6. Add "include /path/to/forko3/nginx.conf;" to your nginx.conf file, inside the http {} block
7. Reload your nginx conf (sudo kill -HUP `cat /opt/local/var/run/nginx/nginx.pid`)
8. Install [node-router](https://github.com/creationix/node-router) and [haml-js](https://github.com/creationix/haml-js) in ../vendor, relative to your forko3 installation.
9. Create a ../apps folder too.
10. Run "node forko3.js"
11. Go to http://localhost to see if it worked!

Installing on Amazon EC2
------------------------

You can create a micro instance (free) with the Ubuntu ami-508c7839 AMI. Install the prerequisites thusly:

    apt-get install git-core build-essential libssl-dev couchdb
    
Then go ahead and start with step 4 above.  The nginx.conf is in /etc/ngninx.

Things you might want to do:
----------------------------
    
Change the port forko3 runs on (remember to update your nginx.conf accordingly):

    node forko3.js -p 1234