#!/bin/bash

# Redirect all output to log file
exec 1>~/thenaturebeautyflowers-deploy.log
exec 2>&1

SOURCE_DIR=~/thenaturebeautyflowers

echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...'
cd $SOURCE_DIR/backend
pm2 start thenaturebeautyflowers-api -i max --watch --log ~/thenaturebeautyflowers-api.log
pm2 save # Respawn after reboot
