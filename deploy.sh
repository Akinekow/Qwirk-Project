#!/bin/sh

#npm install
#bower install
#bower install ng-file-upload-shim --save
#bower install ng-file-upload --save
gulp build
scp -r dist/. webxperience@212.129.6.120:/home/webxperience/gestion
