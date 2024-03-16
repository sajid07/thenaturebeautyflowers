#!/bin/bash
echo 'Build ReactJS Frontend...'

echo 'Set Environment variables to optimize ReactJS build...'
export NODE_OPTIONS=--max-old-space-size=$(expr $(echo "$(free -m)" | awk '/^Mem:/ {print $2}') - 512)
export IMAGE_INLINE_SIZE_LIMIT=0

echo 'Store Newly created environment variables to an .env file for production build...' 
env | grep -e NODE_OPTIONS -e IMAGE_INLINE_SIZE_LIMIT >> .env.production

echo 'Run a Production Build...'
npm run build


echo 'Build and Package ExpressJS Backend...'

echo 'Navigate to Project Backend Directory...'
cd backend

echo 'Generate binary executable file from ExpressJS Backend Application...'
npx @yao-pkg/pkg index.js --options $NODE_OPTIONS --output thenaturebeautyflowers-api