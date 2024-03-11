#!/bin/sh

# Author : Sajid Ishaq
# Copyright (c) thenaturebeautyflowers.com
stat /codebuild/bootstrap/linux-bootstrap
# Install Backend Packages
npm run build-backend

# Run Express Server as a Background Service
echo "Creating service file"
sudo cat > /etc/systemd/system/thenaturebeautyflowers.service << EOF

[Unit]
Description=thenaturebeautyflowers

[Service]
Type=exec
ExecStart=node $PWD/backend/index.js
WorkingDirectory=$PWD

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo "Reloading daemon and enabling service"
sudo systemctl daemon-reload 
sudo systemctl enable thenaturebeautyflowers.service
sudo systemctl start thenaturebeautyflowers.service
echo "Service Started"

exit 0