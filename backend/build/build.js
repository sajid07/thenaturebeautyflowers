const esbuild = require("esbuild");
const findConfig = require("find-config");
const createBuildSettings = require("./settings.js");

function getNormalizedEnvVars() {
  const envVars = {};

  const processEnv = process.env;
  require("dotenv").config({
    override: true,
    path: findConfig(".env.production"),
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
    findConfig(`.env.${process.env.REACT_APP_ENV || "local"}`),
    findConfig(".env.production"),
    envVars,
    require("dotenv").config({
      override: true,
      path: `../.env.${process.env.REACT_APP_ENV || "local"}`,
    }),
    require("dotenv").config({
      override: true,
      path: "../.env.prodction",
    })
  );

  return envVars;
}

const settings = createBuildSettings({ define: getNormalizedEnvVars() });

esbuild.build(settings);
