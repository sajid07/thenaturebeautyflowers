#!/bin/bash

# Production logging setup
LOG_DIR="/var/log/codedeploy"
LOG_FILE="$LOG_DIR/thenaturebeautyflowers-stop.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR" 2>/dev/null

# Redirect output to log file with timestamps
exec > >(while IFS= read -r line; do echo "$(date '+%Y-%m-%d %H:%M:%S') $line"; done | tee -a "$LOG_FILE")
exec 2>&1

echo "Starting application stop process..."

# Configuration
SOURCE_DIR="/home/ubuntu/thenaturebeautyflowers"
APP_NAME="thenaturebeautyflowers-api"

# Load NVM environment
export NVM_DIR="/home/ubuntu/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    echo "NVM environment loaded"
else
    echo "WARNING: NVM not found, using system Node.js"
fi

# Function to safely stop PM2 processes
stop_pm2_application() {
    if command -v pm2 >/dev/null 2>&1; then
        echo "Stopping PM2 application: $APP_NAME"
        
        # Check if the specific app is running
        if pm2 list | grep -q "$APP_NAME"; then
            pm2 stop "$APP_NAME" && echo "Successfully stopped $APP_NAME"
            pm2 delete "$APP_NAME" && echo "Successfully deleted $APP_NAME"
        else
            echo "Application $APP_NAME not found in PM2 processes"
        fi
        
        # Clean up logs for this specific app
        pm2 flush "$APP_NAME" 2>/dev/null || echo "No logs to flush for $APP_NAME"
        
    else
        echo "ERROR: PM2 not found in PATH"
        return 1
    fi
}

# Function to clean up old artifacts
cleanup_artifacts() {
    if [ -d "$SOURCE_DIR" ]; then
        echo "Cleaning up old artifacts in $SOURCE_DIR"
        if find "$SOURCE_DIR" -mindepth 1 -delete 2>/dev/null; then
            echo "Successfully cleaned $SOURCE_DIR"
        else
            echo "WARNING: Failed to clean some files in $SOURCE_DIR"
        fi
    else
        echo "Source directory $SOURCE_DIR does not exist, skipping cleanup"
    fi
}

# Main execution
echo "Current user: $(whoami)"
echo "Node.js version: $(node --version 2>/dev/null || echo 'Not available')"
echo "PM2 version: $(pm2 --version 2>/dev/null || echo 'Not available')"

# Stop the application
if stop_pm2_application; then
    echo "PM2 application stopped successfully"
else
    echo "WARNING: PM2 stop failed, attempting manual cleanup"
    # Fallback: kill processes by name
    pkill -f "node.*$APP_NAME" && echo "Manually killed application processes" || echo "No matching processes found"
fi

# Clean up old artifacts
cleanup_artifacts

echo "Application stop process completed successfully"
