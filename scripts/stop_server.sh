#!/bin/bash
echo 'Remove old Application Build artifacts...'
rm -rf /home/ubuntu/thenaturebeautyflowers{*,.*}

echo 'Stop Running ExpressJS Backend Server Applications if any...'
pm2 stop all
pm2 delete all
