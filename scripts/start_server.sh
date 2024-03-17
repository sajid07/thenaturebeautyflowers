#!/bin/bash
echo 'Start and Keep Running ExpressJS Backend Server Application in the Background...'
cd backend
pm2 start thenaturebeautyflowers-api -i max --watch
