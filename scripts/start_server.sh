source /home/ubuntu/.bashrc
echo 'Start ExpressJS Server: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project's Backend Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
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