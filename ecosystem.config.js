module.exports = {
  apps : [
      {
        "name": "react-app",
        "script": "npx serve",
        "args": "build -s", // Serve the build folder, -s for single-page application fallback
        "env": {
          "NODE_ENV": "production"
        }
    }
  ]
}
