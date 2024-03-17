#!/bin/bash
source /home/ubuntu/.bashrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...'
cd backend
pm2 start thenaturebeautyflowers-api -i max --watch
