#!/bin/bash
HOME_DIR=/home/ubuntu
LOG_FILE=$HOME_DIR/deploy.log
SOURCE_DIR=$HOME_DIR/thenaturebeautyflowers
source $HOME_DIR/.bashrc
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Remove old Application Build artifacts...' >> $LOG_FILE
rm -rf $SOURCE_DIR/* >> $LOG_FILE

echo 'Stop Running ExpressJS Backend Server Applications if any...' >> $LOG_FILE
pm2 stop --silent all >> $LOG_FILE
pm2 delete --silent all >> $LOG_FILE
