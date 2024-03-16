#!/bin/bash
echo 'Run ExpressJS Binary Executable: ' >> /home/ubuntu/thenaturebeautyflowers/deploy.log
exec backend/thenaturebeautyflowers-api >> /home/ubuntu/thenaturebeautyflowers/deploy.log