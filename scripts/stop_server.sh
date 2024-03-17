#!/bin/bash
echo 'Remove old Application Build artifacts...'
rm -rf /home/ubuntu/thenaturebeautyflowers{*,.*}

echo 'Stop Running ExpressJS Backend Server Applications if any...'
sudo killall thenaturebeautyflowers-api
