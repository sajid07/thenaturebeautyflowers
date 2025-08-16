#!/bin/bash

# Production logging setup
LOG_DIR="/var/log/codedeploy"
LOG_FILE="$LOG_DIR/thenaturebeautyflowers-start.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR" 2>/dev/null

# Redirect output to log file with timestamps
exec > >(while IFS= read -r line; do echo "$(date '+%Y-%m-%d %H:%M:%S') $line"; done | tee -a "$LOG_FILE")
exec 2>&1

echo "Starting application start process..."

# Configuration
SOURCE_DIR="/home/ubuntu/thenaturebeautyflowers"
BACKEND_DIR="$SOURCE_DIR/backend"
APP_NAME="thenaturebeautyflowers-api"
UI_APP_NAME="react-app"
PM2_LOG_FILE="/home/ubuntu/thenaturebeautyflowers-api.log"
PM2_UI_LOG_FILE="/home/ubuntu/thenaturebeautyflowers.log"

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

# Function to start backend application with PM2
start_backend_application() {
    echo "Starting $APP_NAME with PM2..."
    
    # Stop existing instance if running
    if pm2 list | grep -q "$APP_NAME"; then
        echo "Stopping existing instance of $APP_NAME"
        pm2 stop "$APP_NAME"
        pm2 delete "$APP_NAME"
    fi

    # Start with PM2 in cluster mode
    pm2 start $APP_NAME \
        --instances max \
        --watch \
        --log "$PM2_LOG_FILE" \
        --time \
        --merge-logs \
        --env production \
        || handle_error "Failed to start $APP_NAME application with PM2"
    
    echo "Backend API Application started successfully with PM2"
}

# Function to start frontend application with PM2
start_frontend_application() {
    echo "Starting $UI_APP_NAME with PM2..."
    
    # Stop existing instance if running
    if pm2 list | grep -q "$UI_APP_NAME"; then
        echo "Stopping existing instance of $UI_APP_NAME"
        pm2 stop "$UI_APP_NAME"
        pm2 delete "$UI_APP_NAME"
    fi

    # Start with PM2 in cluster mode
    pm2 start $UI_APP_NAME \
        --watch \
        --log "$PM2_UI_LOG_FILE" \
        --time \
        --merge-logs \
        --env production \
        || handle_error "Failed to start $UI_APP_NAME application with PM2"
    
    echo "React Application started successfully with PM2"
}

# Function to save PM2 configuration
save_pm2_config() {
    echo "Saving PM2 configuration for auto-restart..."
    pm2 save || echo "WARNING: Failed to save PM2 configuration"
    
    # Ensure PM2 startup script is configured
    pm2 startup ubuntu -u ubuntu --hp /home/ubuntu 2>/dev/null || echo "PM2 startup already configured"
}

# Function to verify the backend application is running
verify_backend_application() {
    echo "Verifying $APP_NAME application status..."
    sleep 5  # Give the app time to start
    
    if pm2 list | grep -q "$APP_NAME.*online"; then
        echo "✓ $APP_NAME Application is running successfully"
        pm2 show "$APP_NAME"
    else
        echo "✗ $APP_NAME Application failed to start properly"
        pm2 logs "$APP_NAME" --lines 20
        handle_error "$APP_NAME Application verification failed"
    fi
}

# Function to verify the frontend application is running
verify_frontend_application() {
    echo "Verifying $UI_APP_NAME application status..."
    sleep 5  # Give the app time to start
    
    if pm2 list | grep -q "$UI_APP_NAME.*online"; then
        echo "✓ $UI_APP_NAME Application is running successfully"
        pm2 show "$UI_APP_NAME"
    else
        echo "✗ $UI_APP_NAME Application failed to start properly"
        pm2 logs "$UI_APP_NAME" --lines 20
        handle_error "$UI_APP_NAME Application verification failed"
    fi
}


# Main execution
echo "Current user: $(whoami)"
echo "Node.js version: $(node --version 2>/dev/null || echo 'Not available')"
echo "NPM version: $(npm --version 2>/dev/null || echo 'Not available')"
echo "PM2 version: $(pm2 --version 2>/dev/null || echo 'Not available')"

# Verify directories exist
check_directory "$SOURCE_DIR"
check_directory "$BACKEND_DIR"

# Navigate to source directory
cd "$SOURCE_DIR" || handle_error "Failed to change to application directory"
echo "Working directory: $(pwd)"

# Start the frontend application
start_frontend_application

# Save PM2 configuration
save_pm2_config

# Verify frontend application is running
verify_frontend_application

# Navigate to backend directory
cd "$BACKEND_DIR" || handle_error "Failed to change to backend directory"
echo "Working directory: $(pwd)"

# Start the backend application
start_backend_application

# Save PM2 configuration
save_pm2_config

# Verify backend application is running
verify_backend_application

echo "Application deployment completed successfully at $(date)"
