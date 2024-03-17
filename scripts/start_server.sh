#!/bin/bash
HOME_DIR=/home/ubuntu
LOG_FILE=$HOME_DIR/deploy.log
SOURCE_DIR=$HOME_DIR/thenaturebeautyflowers
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" >> $LOG_FILE  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" >> $LOG_FILE  # This loads nvm bash_completion

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...' >> $LOG_FILE
cd $SOURCE_DIR/backend >> $LOG_FILE
pm2 start thenaturebeautyflowers-api -i max --watch >> $LOG_FILE
