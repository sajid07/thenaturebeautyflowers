#!/bin/bash
source /home/ubuntu/.bashrc
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Install NPM Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Install Front-end Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
npm cache clean --force && npm i >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project\'s Backend Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers/backend >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Install Back-end Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
npm cache clean --force && npm i >> /home/ubuntu/thenaturebeautyflowers/deploy.log