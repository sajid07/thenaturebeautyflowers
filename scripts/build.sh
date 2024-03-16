#!/bin/bash
echo 'Build ReactJS Frontend...'

echo 'Navigate to Project Directory...'
cd /home/ubuntu/thenaturebeautyflowers

echo 'Set Environment variables to optimize ReactJS build...'
export NODE_OPTIONS=--max-old-space-size=$(expr $(echo "$(free -m)" | awk '/^Mem:/ {print $2}') - 512)

echo 'Store Newly created environment variables to an .env file for production build...' 
env | grep -e NODE_OPTIONS >> /home/ubuntu/thenaturebeautyflowers/.env.production

echo 'Run a Production Build...'
npm run build


echo 'Build and Bundle ExpressJS Backend...'

echo 'Navigate to Project Backend Directory...'
cd backend

echo 'Output CommonJS bundle...'
npx esbuild index.js  --bundle --outfile=build.cjs --format=cjs --platform=node

echo 'Generate binary executable file from previously generated bundle...'
npx pkg build.cjs --options $NODE_OPTIONS --output thenaturebeautyflowers-api