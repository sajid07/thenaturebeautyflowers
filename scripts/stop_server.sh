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
UI_APP_NAME="thenaturebeautyflowers-ui"
APPS=("$APP_NAME" "$UI_APP_NAME")

# Load NVM environment
export NVM_DIR="/home/ubuntu/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    echo "NVM environment loaded"
else
    echo "WARNING: NVM not found, using system Node.js"
fi

# Function to handle errors
handle_error() {
    echo "ERROR: $1"
    exit 1
}

# Function to check if directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        handle_error "Directory not found: $1"
    fi
}

# Function to safely stop PM2 processes
stop_pm2_application() {
    if command -v pm2 >/dev/null 2>&1; then
        echo "Stopping PM2 application: $1"
        
        # Check if the specific app is running
        if pm2 list | grep -q "$1"; then
            (pm2 stop ecosystem.config.js --only "$1" && echo "Successfully stopped $1") || handle_error "Failed to stop $1 application with PM2"
            (pm2 delete ecosystem.config.js --only "$1" && echo "Successfully deleted $1") || handle_error "Failed to delete $1 application with PM2"
        else
            echo "Application $1 not found in PM2 processes"
        fi
        
        # Clean up logs for this specific app
        pm2 flush ecosystem.config.js --only "$1" 2>/dev/null || echo "No logs to flush for $1"
        
    else
        handle_error "ERROR: PM2 not found in PATH"
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

# Navigate to source directory
# Verify the directory exists
check_directory "$SOURCE_DIR"
cd "$SOURCE_DIR" || handle_error "Failed to change to application directory"
echo "Working directory: $(pwd)"

# Loop through each application in the APPS array
for app in "${APPS[@]}"; do
    # Stop the application
    if stop_pm2_application "$app"; then
        echo "PM2 application $app stopped successfully"
    else
        echo "WARNING: PM2 stop failed, attempting manual cleanup"
        # Fallback: kill processes by name
        pkill -f "node.*$app" && echo "Manually killed application processes" || echo "No matching processes found"
    fi
done

# Clean up old artifacts
cleanup_artifacts

echo "Application stop process completed successfully"
