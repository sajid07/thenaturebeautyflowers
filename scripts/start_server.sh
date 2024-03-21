#!/bin/bash
source ~/.profile

# Redirect all output to log file
sudo exec 1>>/opt/thenaturebeautyflowers-deploy.log
sudo exec 2>&1

SOURCE_DIR=~/thenaturebeautyflowers
export NVM_DIR="~/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...'
cd $SOURCE_DIR/backend
pm2 start thenaturebeautyflowers-api -i max --watch --log /opt/thenaturebeautyflowers-api.log
pm2 save # Respawn after reboot
