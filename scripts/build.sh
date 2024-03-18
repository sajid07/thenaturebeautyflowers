#!/bin/bash
echo 'Build ReactJS Frontend...'

echo 'Set Environment variables to optimize ReactJS build...'
export NODE_OPTIONS=--max-old-space-size=$(expr $(echo "$(free -m)" | awk '/^Mem:/ {print $2}') - 512)
export IMAGE_INLINE_SIZE_LIMIT=0
export REACT_APP_ENV="prodction"

echo 'Store Newly created environment variables to an .env file for production build...' 
env | grep -e NODE_OPTIONS -e IMAGE_INLINE_SIZE_LIMIT -e REACT_APP_ENV >> .env.production

echo 'Run a Production Build...'
npm run build


echo 'Build and Package ExpressJS Backend...'

echo 'Navigate to Project Backend Directory...'
cd backend

echo 'Output CommonJS bundle...'
npm run build

echo 'Generate binary executable file from ExpressJS Backend Application...'
npx @yao-pkg/pkg --output thenaturebeautyflowers-api build.cjs