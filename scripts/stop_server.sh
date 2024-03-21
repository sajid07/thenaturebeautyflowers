#!/bin/bash
source ~/.profile

# Redirect all output to log file
sudo exec 1>>/opt/thenaturebeautyflowers-deploy.log
sudo exec 2>&1

SOURCE_DIR=~/thenaturebeautyflowers
export NVM_DIR="~/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Remove old Application Build artifacts...'
sudo find $SOURCE_DIR -mindepth 1 -delete

echo 'Stop Running ExpressJS Backend Server Applications and remove logs if any...'
pm2 stop all
pm2 delete all
pm2 flush