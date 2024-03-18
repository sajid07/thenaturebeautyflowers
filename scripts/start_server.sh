#!/bin/bash
# Redirect all output to log file
exec 1>>/opt/thenaturebeautyflowers-deploy.log
exec 2>&1

HOME_DIR=/home/ubuntu
SOURCE_DIR=$HOME_DIR/thenaturebeautyflowers
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...'
cd $SOURCE_DIR/backend
pm2 start thenaturebeautyflowers-api -i max --watch --log /opt/thenaturebeautyflowers-api.log
pm2 save # Respawn after reboot
