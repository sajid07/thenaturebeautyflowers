module.exports = {
  apps : [
      {
          "name": "thenaturebeautyflowers-api",
          "script": "backend/thenaturebeautyflowers-api",
          "instances": "max",
          "exec_mode": "cluster",
          "watch": true,
          "merge_logs": true,
          "log_file": "../thenaturebeautyflowers-api.log",
          "time": true,
          "env": {
            "NODE_ENV": "production"
          }
      }
      {
        "name": "thenaturebeautyflowers-ui",
        "script": "npx serve",
        "args": "build -s", // Serve the build folder, -s for single-page application fallback
        "watch": true,
        "merge_logs": true,
        "time": true,
        "log_file": "../thenaturebeautyflowers.log",
        "env": {
          "NODE_ENV": "production"
        }
    }
  ]
}
