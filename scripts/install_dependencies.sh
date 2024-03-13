source /home/ubuntu/.bashrc
echo 'Install NPM Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Install Front-end Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
npm ci >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Navigate to Project's Backend Directory: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
cd /home/ubuntu/thenaturebeautyflowers/backend >> /home/ubuntu/thenaturebeautyflowers/deploy.log

echo 'Install Back-end Dependencies: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log 
npm ci >> /home/ubuntu/thenaturebeautyflowers/deploy.log