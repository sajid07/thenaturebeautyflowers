module.exports = {
  apps: [
    {
      "name": "thenaturebeautyflowers-api",
      "script": "/home/ubuntu/thenaturebeautyflowers/backend/thenaturebeautyflowers-api",
      "instances": "max",
      "exec_mode": "cluster",
      "watch": true,
      "merge_logs": true,
      "log_file": "../thenaturebeautyflowers-api.log",
      "time": true,
      "env_production": {
        "NODE_ENV": "production"
      }
    },
    {
      "name": "thenaturebeautyflowers-ui",
      "script": "npx",
      "args": ["serve", "/home/ubuntu/thenaturebeautyflowers/build", "-s", "-l 3000", "-n", "-u", "-S"],
      "watch": false,
      "merge_logs": true,
      "time": true,
      "log_file": "../thenaturebeautyflowers.log",
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ]
}
