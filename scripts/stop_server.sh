#!/bin/bash
# Redirect all output to log file
exec 1>>/opt/thenaturebeautyflowers-deploy.log
exec 2>&1

HOME_DIR=/home/ubuntu
SOURCE_DIR=$HOME_DIR/thenaturebeautyflowers
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Remove old Application Build artifacts...'
find $SOURCE_DIR -mindepth 1 -delete

echo 'Stop Running ExpressJS Backend Server Applications and remove logs if any...'
pm2 stop --silent all
pm2 delete --silent all
pm2 flush
