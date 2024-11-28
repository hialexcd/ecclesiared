const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const aliases = require('./aliases');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config before returning it.
  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
    'react-native$': 'react-native-web',
    'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
    'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
    '@react-native/assets-registry': 'react-native-web/dist/modules/AssetRegistry',
    'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/exports/View/ViewStylePropTypes',
  };

  // Set the correct entry point
  config.entry = './App.js';

  // Set mode to development
  config.mode = 'development';

  return config;
};