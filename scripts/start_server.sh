#!/bin/bash
source /home/ubuntu/.bashrc
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo 'Start ExpressJS Server: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project Backend Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers/backend >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Stop Already Running Servers if any: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
pm2 stop all >> /home/ubuntu/thenaturebeautyflowers/deploy.log
pm2 delete all >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Start ExpressJS Backend Server: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
pm2 start index.js -i max --watch >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Build ReactJS Frontend: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Run a Production Build: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
npm run build >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Serve ReactJS Frontend: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Run a Production Build: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
serve -s build >> /home/ubuntu/thenaturebeautyflowers/deploy.log