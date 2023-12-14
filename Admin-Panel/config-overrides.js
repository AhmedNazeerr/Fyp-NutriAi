// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Add the backend directory to resolve.modules
  config.resolve.modules.push(path.resolve('./backend'));

  return config;
};
