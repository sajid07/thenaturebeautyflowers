#!/bin/bash
HOME_DIR=/home/ubuntu
source $HOME_DIR/.bashrc
export NVM_DIR="$HOME_DIR/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Remove old Application Build artifacts...'
rm -rf $HOME_DIR/thenaturebeautyflowers/{*,.*}

echo 'Stop Running ExpressJS Backend Server Applications if any...'
pm2 stop --silent all
pm2 delete --silent all
