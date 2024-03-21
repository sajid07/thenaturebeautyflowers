#!/bin/bash

# Redirect all output to log file
exec 1>~/thenaturebeautyflowers-deploy.log
exec 2>&1

SOURCE_DIR=~/thenaturebeautyflowers

echo 'Remove old Application Build artifacts...'
sudo find $SOURCE_DIR -mindepth 1 -delete

echo 'Stop Running ExpressJS Backend Server Applications and remove logs if any...'
pm2 stop all
pm2 delete all
pm2 flush thenaturebeautyflowers-api