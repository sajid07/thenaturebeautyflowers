const esbuild = require("esbuild");
const createBuildSettings = require("./settings.js");
const path = require("path-browserify");

function getNormalizedEnvVars() {
  const envVars = {};

  var processEnv = process.env;
  const dotenvConfig = require("dotenv").config({
    override: true,
    path: `../.env.${process.env.REACT_APP_ENV || "local"}`,
  });

  if (dotenvConfig && dotenvConfig.parsed) {
    processEnv = { ...processEnv, ...dotenvConfig.parsed };
  }
  console.log(
    process.cwd(),
    path.resolve(process.cwd, ".env.production"),
    dotenvConfig,
    require("dotenv").config({
      override: true,
      path: "../.env.production",
    }),
    require("dotenv").config({
      override: true,
      path: ".env.production",
    })
  );

  for (let k in processEnv) {
    k = k.replace(/ /g, "");

    // Bypass windows errors
    if (k === "CommonProgramFiles(x86)" || k === "ProgramFiles(x86)") {
      continue;
    }

    envVars[`process.env.${k}`] = JSON.stringify(process.env[k]);
  }

  return envVars;
}

const settings = createBuildSettings({ define: getNormalizedEnvVars() });

esbuild.build(settings);
