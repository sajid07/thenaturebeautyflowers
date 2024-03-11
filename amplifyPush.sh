#!/bin/sh

# Author : Sajid Ishaq
# Copyright (c) thenaturebeautyflowers.com

# Install PM2 Module
npm install pm2 -g

# Install Backend Packages
npm run build-backend

# Run Express Server as a Background Service
pm2 start $PWD/backend/index.js -i max

exit 0