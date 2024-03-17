// Config: relative to where npm command is run:
function createBuildSettings(options) {
  return {
    entryPoints: ["index.js"],
    outfile: "build.cjs",
    platform: "node",
    bundle: true,
    minify: true,
    format: "cjs",
    logLevel: "silent",
    ...options,
  };
}

module.exports = createBuildSettings;
