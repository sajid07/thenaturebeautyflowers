#!/bin/bash
HOME_DIR=/home/ubuntu
SOURCE_DIR=$HOME_DIR/thenaturebeautyflowers
source $HOME_DIR/.bashrc
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...' >> $SOURCE_DIR/deploy.log
cd backend >> $SOURCE_DIR/deploy.log
pm2 start thenaturebeautyflowers-api -i max --watch >> $SOURCE_DIR/deploy.log
