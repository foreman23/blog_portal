const path = require('path');

module.exports = function override(config) {
  // Add the following fallback configurations
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    fs: false, // Since 'fs' is not required in the browser environment
  };

  // Add the following alias for the 'path' module
  config.resolve.alias.path = require.resolve('path-browserify');

  return config;
};