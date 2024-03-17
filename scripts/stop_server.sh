#!/bin/bash
source /home/ubuntu/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Remove old Application Build artifacts...'
rm -rf ~/thenaturebeautyflowers/{*,.*}

echo 'Stop Running ExpressJS Backend Server Applications if any...'
pm2 stop all
pm2 delete all
