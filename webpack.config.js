const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = async function (env, argv) {
  env.mode = env.mode || 'production'; // Set the mode to production if not specified
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    zlib: require.resolve('browserify-zlib'),
    util: require.resolve('util')
  };

  config.plugins = (config.plugins || []).concat([
    new NodePolyfillPlugin()
  ]);

  return config;
};
