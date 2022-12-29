#!/bin/bash

echo "Loading nodejs"
#Enable NVM/NODEJS/NPM
export NVM_DIR=/usr/local/nvm
source /opt/nvm/nvm.sh
cd /hosting/sites/hooverhigh/videojs-plugins
echo "In directory: $(pwd)"
#Start server
node bundle-$1.js
