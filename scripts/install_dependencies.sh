#!/bin/bash
echo 'Install and configure Utilities to be used by subsequent scripts...'
apt-get update -y
apt-get install jq -y
aws configure set region $AWS_REGION

echo 'Install NPM Dependencies...'

echo 'Install Front-end Dependencies...' 
npm cache clean --force && npm i

echo 'Install Back-end Dependencies...' 
cd backend && npm cache clean --force && npm i