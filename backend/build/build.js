const esbuild = require("esbuild");
const findConfig = require("find-config");
const createBuildSettings = require("./settings.js");

function getNormalizedEnvVars() {
  const envVars = {};

  const processEnv = process.env;
  require("dotenv").config({
    override: true,
    path: findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
    processEnv: processEnv,
  });

  for (let k in processEnv) {
    k = k.replace(/ /g, "");

    // Bypass windows errors
    if (k === "CommonProgramFiles(x86)" || k === "ProgramFiles(x86)") {
      continue;
    }

    envVars[`process.env.${k}`] = JSON.stringify(process.env[k]);
  }

  console.log(
    `.env.${process.env.REACT_APP_ENV || "local"}`,
    process.env.REACT_APP_ENV,
    findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
    findConfig(".env.production"),
    envVars,
    processEnv,
    require("dotenv").config({
      override: true,
      path: findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
      processEnv: processEnv,
    }),
    findConfig.read(`.env.${process.env.REACT_APP_ENV || "local"}`),
    findConfig.read(".env.production")
  );

  return envVars;
}

const settings = createBuildSettings({ define: getNormalizedEnvVars() });

esbuild.build(settings);
