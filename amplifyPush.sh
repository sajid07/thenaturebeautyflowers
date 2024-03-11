#!/bin/sh

# Author : Sajid Ishaq
# Copyright (c) thenaturebeautyflowers.com

cd backend

# Install Backend Packages
npm ci

# Run Express Server as a Background Service
while :; do
    node index.js

    echo "Restarting..."
    sleep 1
done