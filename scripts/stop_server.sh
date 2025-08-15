#!/bin/bash

# Enable debug mode to see each command as it executes
set -x

# Redirect all output to log file
exec 1>~/thenaturebeautyflowers-deploy.log
exec 2>&1

echo "=== DEBUGGING INFORMATION ==="
echo "Script started at: $(date)"
echo "Current user: $(whoami)"
echo "Current working directory: $(pwd)"
echo "Current PATH: $PATH"
echo "Home directory: $HOME"

# Check if basic commands exist
echo "=== COMMAND AVAILABILITY CHECK ==="
echo "bash location: $(which bash 2>/dev/null || echo 'not found')"
echo "find location: $(which find 2>/dev/null || echo 'not found')"
echo "sudo location: $(which sudo 2>/dev/null || echo 'not found')"

# Check NVM and Node.js environment
echo "=== NODE.JS ENVIRONMENT CHECK ==="
echo "NVM directory exists: $([ -d ~/.nvm ] && echo 'yes' || echo 'no')"
echo "NVM script exists: $([ -f ~/.nvm/nvm.sh ] && echo 'yes' || echo 'no')"

# Try to load NVM environment
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    echo "Loading NVM environment..."
    \. "$NVM_DIR/nvm.sh"
    echo "NVM loaded successfully"
else
    echo "NVM script not found at $NVM_DIR/nvm.sh"
fi

# Check Node.js and PM2 after loading NVM
echo "Node version: $(node --version 2>/dev/null || echo 'Node not found')"
echo "NPM version: $(npm --version 2>/dev/null || echo 'NPM not found')"
echo "PM2 location: $(which pm2 2>/dev/null || echo 'PM2 not found in PATH')"

# Check if PM2 exists at the known location
PM2_FULL_PATH="/home/ubuntu/.nvm/versions/node/v20.11.1/bin/pm2"
echo "PM2 at known path: $([ -f "$PM2_FULL_PATH" ] && echo 'exists' || echo 'not found')"

SOURCE_DIR=~/thenaturebeautyflowers
echo "Source directory: $SOURCE_DIR"
echo "Source directory exists: $([ -d "$SOURCE_DIR" ] && echo 'yes' || echo 'no')"

echo "=== STARTING ACTUAL SCRIPT OPERATIONS ==="

echo 'Remove old Application Build artifacts...'
if [ -d "$SOURCE_DIR" ]; then
    echo "Attempting to clean $SOURCE_DIR"
    sudo find $SOURCE_DIR -mindepth 1 -delete
    if [ $? -eq 0 ]; then
        echo "Successfully cleaned $SOURCE_DIR"
    else
        echo "Error cleaning $SOURCE_DIR (exit code: $?)"
    fi
else
    echo "Source directory $SOURCE_DIR does not exist, skipping cleanup"
fi

echo 'Stop Running ExpressJS Backend Server Applications and remove logs if any...'

# Try different approaches to run PM2
if [ -f "$PM2_FULL_PATH" ]; then
    echo "Using PM2 at full path: $PM2_FULL_PATH"
    $PM2_FULL_PATH stop all
    $PM2_FULL_PATH delete all
    $PM2_FULL_PATH flush thenaturebeautyflowers-api
elif command -v pm2 >/dev/null 2>&1; then
    echo "Using PM2 from PATH"
    pm2 stop all
    pm2 delete all
    pm2 flush thenaturebeautyflowers-api
else
    echo "PM2 not found, attempting manual process cleanup"
    pkill -f "node.*thenaturebeautyflowers" || echo "No matching Node.js processes found"
fi

echo "Script completed at: $(date)"
echo "=== END OF SCRIPT ==="
